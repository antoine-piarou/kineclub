import React, { useState } from 'react';
import { parseExcel } from './utils/excelParser';
import type { PlayerData, TeamData } from './utils/excelParser';
import { ReportCard } from './components/ReportCard';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { FileSpreadsheet, Download, Loader2, Users } from 'lucide-react';

function App() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [teamName, setTeamName] = useState("Basket Club Test");
  const [date, setDate] = useState(new Date().toLocaleDateString('fr-FR'));


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const { players, team } = await parseExcel(file);
      setPlayers(players);
      setTeamData(team);

      // Try to guess team name/date from filename
      // "tableau kineteam BCUS test 11.09.2025.xlsx"
      const filename = file.name;
      const dateMatch = filename.match(/(\d{2}\.\d{2}\.\d{4})/);
      if (dateMatch) {
        setDate(dateMatch[1].replace(/\./g, '/'));
      }
      if (filename.includes("BCUS")) {
        setTeamName("BCUS");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      alert(`Error parsing Excel file: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">KineTeam PDF Generator</h1>
          <p className="text-gray-600">Upload the Excel file to generate individual player reports.</p>
        </header>

        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Excel File</label>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <FileSpreadsheet className="w-5 h-5 mr-2 text-green-600" />
                <span className="text-sm text-gray-600">Choose File...</span>
              </label>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {players.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Players Found ({players.length})
              </h2>
              <button
                onClick={() => {
                  // Trigger generation logic
                  const generate = async () => {
                    setIsProcessing(true);
                    const zip = new JSZip();
                    const container = document.getElementById('pdf-container');
                    if (!container) return;

                    const cards = container.children;
                    for (let i = 0; i < cards.length; i++) {
                      const card = cards[i] as HTMLElement;
                      const player = players[i];
                      setProgress(Math.round(((i + 1) / players.length) * 100));

                      // Small delay to ensure render
                      await new Promise(r => setTimeout(r, 100));

                      // Find all 4 pages within this card
                      const pages = card.querySelectorAll('.page-break-after, .page-break-after + div, div[class*="h-\\[297mm\\]"]');
                      const pdf = new jsPDF('p', 'mm', 'a4');
                      const pdfWidth = pdf.internal.pageSize.getWidth();
                      const pdfHeight = pdf.internal.pageSize.getHeight();

                      // If we have the 4-page structure, capture each page
                      if (pages.length >= 4) {
                        for (let pageIdx = 0; pageIdx < 4; pageIdx++) {
                          const pageElement = pages[pageIdx] as HTMLElement;

                          // Capture this specific page
                          const canvas = await html2canvas(pageElement, {
                            scale: 2,
                            useCORS: true,
                            width: pageElement.offsetWidth,
                            height: pageElement.offsetHeight,
                            windowWidth: pageElement.offsetWidth,
                            windowHeight: pageElement.offsetHeight
                          });

                          const imgData = canvas.toDataURL('image/png');

                          // Add new page for pages after the first
                          if (pageIdx > 0) {
                            pdf.addPage();
                          }

                          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                        }
                      } else {
                        // Fallback: capture the entire card as one page
                        const canvas = await html2canvas(card, { scale: 2, useCORS: true });
                        const imgData = canvas.toDataURL('image/png');
                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                      }

                      zip.file(`${player.name.replace(/[^a-z0-9]/gi, '_')}_Report.pdf`, pdf.output('blob'));
                    }

                    const content = await zip.generateAsync({ type: 'blob' });
                    const url = window.URL.createObjectURL(content);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `KineTeam_Reports_${teamName}.zip`;
                    a.click();
                    setIsProcessing(false);
                    setProgress(0);
                  };
                  generate();
                }}
                disabled={isProcessing}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing {progress}%
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Download All PDFs
                  </>
                )}
              </button>
            </div>

            {/* Preview List (Horizontal Scroll) */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {players.map((player, idx) => (
                  <div key={idx} className="transform scale-[0.4] origin-top-left w-[210mm] h-[297mm] border shadow-lg bg-white mb-[-160mm] mr-[-120mm]">
                    {teamData && (
                      <ReportCard
                        player={player}
                        team={teamData}
                        teamName={teamName}
                        date={date}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hidden Container for Generation */}
        {players.length > 0 && teamData && (
          <div id="pdf-container" className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
            {players.map((player, idx) => (
              <div key={idx} className="mb-10">
                <ReportCard
                  player={player}
                  team={teamData}
                  teamName={teamName}
                  date={date}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
