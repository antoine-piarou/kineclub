import * as XLSX from 'xlsx';

export interface PlayerData {
    id: string;
    name: string;
    metrics: { name: string; value: string | number }[];
    scores: { category: string; value: number }[];
}

export interface TeamData {
    metrics: { name: string; value: string | number }[];
    scores: { category: string; value: number }[];
}

export const parseExcel = async (file: File): Promise<{ players: PlayerData[], team: TeamData }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                
                // Validate workbook
                if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
                    throw new Error('Invalid Excel file: no sheets found');
                }
                
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                
                // Validate sheet exists
                if (!sheet) {
                    throw new Error('Invalid Excel file: sheet is missing');
                }
                
                // Check if sheet has a range reference
                if (!sheet['!ref']) {
                    throw new Error('Invalid Excel file: sheet is empty');
                }

                // Get the range of the sheet
                let range;
                try {
                    range = XLSX.utils.decode_range(sheet['!ref']);
                } catch (err) {
                    throw new Error('Invalid Excel file: could not decode sheet range');
                }

                // Validate range is valid
                if (range.e.r < range.s.r || range.e.c < range.s.c) {
                    throw new Error('Invalid Excel file: invalid sheet range');
                }

                // Count cells with actual data to verify sheet has content
                const cellKeys = Object.keys(sheet).filter(key => !key.startsWith('!'));
                if (cellKeys.length === 0) {
                    throw new Error('Invalid Excel file: sheet contains no data cells');
                }

                // Manually build jsonData by reading cell values (not formulas)
                const jsonData: any[][] = [];
                for (let R = range.s.r; R <= range.e.r; ++R) {
                    const row: any[] = [];
                    for (let C = range.s.c; C <= range.e.c; ++C) {
                        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                        const cell = sheet[cellAddress];

                        // Get the calculated value (v) instead of formula (f)
                        if (cell && cell.v !== undefined) {
                            row.push(cell.v);
                        } else {
                            row.push(null);
                        }
                    }
                    jsonData.push(row);
                }

                // Validate jsonData is not empty
                if (!jsonData || jsonData.length === 0) {
                    throw new Error(`Invalid Excel file: no data found in sheet. Range: ${sheet['!ref']}, Cells with data: ${cellKeys.length}`);
                }

                // Row 0: Headers
                const headers = jsonData[0];
                
                // Validate headers exist and is a valid array
                if (!headers) {
                    throw new Error('Invalid Excel file: headers row is missing');
                }
                if (!Array.isArray(headers)) {
                    throw new Error('Invalid Excel file: headers row is not an array');
                }
                if (headers.length === 0) {
                    throw new Error('Invalid Excel file: headers row is empty');
                }
                
                // Col 0: Metrics
                const metricsCol = jsonData.map(row => row[0]);

                // Identify Category Rows (Scores 0-10)
                // Based on analysis: ANATOMIE, MOBILITE, FORCE, EXPLOSIVITE, VITESSE, CARDIO, MOUVEMENT
                const categories = ['ANATOMIE', 'MOBILITE', 'FORCE', 'EXPLOSIVITE', 'VITESSE', 'CARDIO', 'MOUVEMENT'];
                const categoryIndices: number[] = [];

                metricsCol.forEach((metric, index) => {
                    if (typeof metric === 'string' && categories.includes(metric.trim())) {
                        categoryIndices.push(index);
                    }
                });

                // Identify Players
                // Structure: Column i = Name/Raw Values, Column i+1 = ID/Scores
                const players: PlayerData[] = [];
                let teamData: TeamData | null = null;
                let teamProcessed = false; // Flag to ensure we only process EQUIPE SCORE once

                for (let i = 1; i < headers.length; i++) {
                    const header = headers[i];

                    // We look for String headers which are Player Names (or Team)
                    // We skip numbers or empty/unnamed headers as they are the secondary columns handled within the loop
                    if (typeof header !== 'string' || header.startsWith('Unnamed')) continue;

                    // Skip MOYENNE column (it's average, not team data)
                    if (header.toUpperCase().includes('MOYENNE') && !header.toUpperCase().includes('EQUIPE')) {
                        continue;
                    }

                    // Check if it's a player or Team
                    // Only EQUIPE is the team, MOYENNE is average and should be ignored
                    const isTeam = header.toUpperCase().includes('EQUIPE') && !header.toUpperCase().includes('MOYENNE');
                    
                    // For EQUIPE: only process SCORE column, skip NOTE column
                    if (isTeam) {
                        // Check if we already processed team data
                        if (teamProcessed) {
                            continue; // Skip EQUIPE NOTE column
                        }
                        // Check row 1 to see if current column is NOTE
                        const secondRow = jsonData[1];
                        if (secondRow && secondRow[i]) {
                            const secondHeader = String(secondRow[i]).toUpperCase();
                            if (secondHeader.includes('NOTE')) {
                                continue; // Skip NOTE column, we'll process SCORE column
                            }
                        }
                        teamProcessed = true; // Mark team as processed
                    }

                    // The score column is likely the NEXT one (i + 1)
                    // But we should verify if i+1 exists and corresponds to the pattern
                    const scoreColIndex = i + 1;

                    const scores: { category: string; value: number }[] = [];
                    const metrics: { name: string; value: string | number }[] = [];

                    // Extract Scores
                    // For players: scores are in scoreColIndex (i + 1)
                    // For team: scores are in the same column (i) since there's no secondary column
                    const actualScoreCol = isTeam ? i : scoreColIndex;

                    categoryIndices.forEach(rowIndex => {
                        const category = metricsCol[rowIndex];
                        const value = jsonData[rowIndex][actualScoreCol];
                        const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                        scores.push({ category, value: !isNaN(numValue) ? numValue : 0 });
                    });

                    // Extract Other Metrics
                    // For players: column i is SCORE, column i+1 is NOTE  
                    // For team: check row 1 (subheaders) to determine if current column is SCORE or NOTE
                    let metricsColIndex = i;
                    if (isTeam) {
                        // Check row 1 (second header row) to see if current column is SCORE or NOTE
                        const secondRow = jsonData[1];
                        if (secondRow && secondRow[i]) {
                            const secondHeader = String(secondRow[i]).toUpperCase();
                            if (secondHeader.includes('NOTE')) {
                                // Current column is NOTE, use previous column for SCORE
                                metricsColIndex = i - 1;
                            } else if (secondHeader.includes('SCORE')) {
                                // Current column is SCORE, use it
                                metricsColIndex = i;
                            } else {
                                // Try to find SCORE column by checking adjacent columns
                                for (let offset = -2; offset <= 2; offset++) {
                                    const checkCol = i + offset;
                                    if (checkCol >= 0 && checkCol < headers.length && secondRow[checkCol]) {
                                        const checkHeader = String(secondRow[checkCol]).toUpperCase();
                                        if (checkHeader.includes('SCORE') && !checkHeader.includes('NOTE')) {
                                            metricsColIndex = checkCol;
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            // Fallback: assume current column is SCORE (same pattern as players)
                            metricsColIndex = i;
                        }
                    }

                    jsonData.forEach((row, rowIndex) => {
                        if (rowIndex === 0) return; // Skip header
                        if (categoryIndices.includes(rowIndex)) return; // Skip scores rows

                        const metricName = row[0];
                        if (!metricName || typeof metricName !== 'string') return;

                        // Skip "TEST" or "NOTE" or similar if they are just section headers
                        if (metricName === 'TEST' || metricName === 'NOTE') return;

                        const value = row[metricsColIndex];
                        // Only include if value is present
                        if (value !== undefined && value !== null && value !== '') {
                            metrics.push({ name: metricName, value: value });
                        }
                    });

                    const data = {
                        metrics,
                        scores
                    };

                    if (isTeam) {
                        teamData = data;
                    } else {
                        players.push({
                            id: `player-${i}`,
                            name: header,
                            ...data
                        });
                    }
                }

                resolve({ players, team: teamData || { metrics: [], scores: [] } });
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
    });
};
