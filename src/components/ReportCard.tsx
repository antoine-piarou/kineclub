import React, { forwardRef } from 'react';
import type { PlayerData, TeamData } from '../utils/excelParser';
import { RadarChart } from './RadarChart';
import { BarChart } from './BarChart';
import logo from '../assets/logo.png';
import {
    User,
    Heart,
    Dumbbell,
    Zap,
    Activity,
    Move,
    Target,
    TrendingUp,
    ClipboardList
} from 'lucide-react';

interface Props {
    player: PlayerData;
    team: TeamData;
    date?: string;
    teamName?: string;
}

const formatValue = (value: string | number): string | number => {
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return value;
    // Arrondi à 2 décimales maximum, sans forcer les zéros inutiles
    return parseFloat(num.toFixed(2));
};

export const ReportCard = forwardRef<HTMLDivElement, Props>(({ player, team, date = "28/08/2025", teamName = "Basket Club Test 2" }, ref) => {
    return (
        <div ref={ref} className="bg-white font-sans text-cyan-900">
            {/* PAGE 1 - Cover & Charts */}
            <div className="w-[210mm] h-[297mm] bg-white flex flex-col relative overflow-hidden page-break-after">
                {/* Clean Flat Header */}
                <div className="h-[50mm] flex bg-white">
                    <div className="w-1/3 flex flex-col items-center justify-center p-8 border-r border-cyan-600/50">
                        <div className="mb-4">
                            <img
                                src={logo}
                                alt="Logo KineTeam"
                                className="h-24 object-contain"
                            />
                        </div>
                    </div>
                    <div className="w-2/3 p-8 flex flex-col justify-between bg-cyan-600">
                        <div>
                            <div className="space-y-1.5 text-white">
                                <p className="font-bold text-sm">BOY Antoine, BROS Thomas, BARUSSEAU Corentin</p>
                                <p className="text-sm font-medium">Kinésithérapeutes du sport</p>
                                <p className="text-sm">1 rue Jean Nouailher 87000 Limoges</p>
                                <p className="text-sm font-medium">kineteam87@gmail.com</p>
                                <p className="text-sm font-bold">05 55 32 23 38</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 flex flex-col gap-6">
                    {/* Zone haute : 3/4 graphique radar, 1/4 joueur + tableau des scores */}
                    <div className="grid grid-cols-3 gap-8 flex-1">
                        {/* 3/4 : Radar Chart */}
                        <div className="col-span-2 flex flex-col">
                            <div className="flex-1 relative min-h-[260px]">
                                <RadarChart playerScores={player.scores} teamScores={team.scores} />
                            </div>
                            <div className="mt-4 flex justify-center gap-8 border-t border-cyan-600/50 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-orange-500"></div>
                                    <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">JOUEUR</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-cyan-600/100"></div>
                                    <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">EQUIPE</span>
                                </div>
                            </div>
                        </div>

                        {/* 1/4 : Infos joueur + tableau des scores */}
                        <div className="col-span-1 flex flex-col gap-4">
                            {/* Player Info - Minimalist */}
                            <div className="border-l-4 border-cyan-900 pl-4 py-3 bg-cyan-700/20">
                                <div className="grid grid-cols-1 gap-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider w-16">Joueur</span>
                                        <span className="text-sm font-bold text-cyan-900 line-clamp-2">{player.name}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider w-16">Equipe</span>
                                        <span className="text-sm font-bold text-cyan-900 line-clamp-2">{teamName}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider w-16">Date</span>
                                        <span className="text-sm font-bold text-cyan-900">{date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Score Reference Table - même design que l'encadré joueur */}
                            <div className="border-l-4 border-cyan-900 bg-cyan-700/20 pl-4 pr-3 py-3">
                                <div className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider mb-2">
                                    Niveaux de score
                                </div>
                                <div className="grid grid-cols-2 gap-y-1 text-[11px]">
                                    <div className="font-bold text-cyan-900">Score</div>
                                    <div className="font-bold text-cyan-900 text-right">Niveau</div>
                                    {[
                                        { score: '0 - 30', level: 'Loisir' },
                                        { score: '30 - 50', level: 'Départ' },
                                        { score: '50 - 70', level: 'Région' },
                                        { score: '70 - 90', level: 'National' },
                                        { score: '90 - 100', level: 'Pro' },
                                    ].map((item, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="text-cyan-800">{item.score}</div>
                                            <div className="text-cyan-800 text-right font-semibold">{item.level}</div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bas de page : graphique barres en pleine largeur */}
                    <div className="mt-4">
                        <div className="flex items-center gap-3 mb-3 border-b border-cyan-600/50 pb-2">
                            <TrendingUp className="w-5 h-5 text-cyan-900" />
                            <h3 className="text-lg font-bold text-cyan-900 uppercase tracking-tight">Comparaison</h3>
                        </div>
                        <div className="h-[85mm]">
                            <BarChart playerMetrics={player.metrics} teamMetrics={team.metrics} />
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 2 - Caractéristiques */}
            <div className="w-[210mm] h-[297mm] bg-white p-12 flex flex-col page-break-after">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-cyan-900 uppercase tracking-tight mb-4">Caractéristiques physiques</h2>
                    <div className="w-16 h-1 bg-cyan-900 mx-auto"></div>
                </div>

                <div className="space-y-8 flex-1">
                    {[
                        { icon: User, title: 'Anatomie', desc: "Les caractéristiques anatomiques Ce sont les bases physiques propres à chaque joueur : taille, envergure, masse musculaire, proportions corporelles. En basketball, il est souvent bénéfique d'être imposant avec de grands bras. On ne peut pas les changer, mais on peut les optimiser par un travail adapté (prise de masse, mobilité, condition physique) pour exploiter pleinement son potentiel." },
                        { icon: Heart, title: 'Cardio', desc: "C'est la capacité à maintenir un effort prolongé et à récupérer rapidement. Indispensable pour tenir l'intensité sur tout un match, courir en transition, défendre fort sans baisser de régime. Amélioration : fractionné, jeux réduits à haute intensité, courses continues modérées et travail d'endurance spécifique. Le tout dosé selon son profil cardio." },
                        { icon: Dumbbell, title: 'Force', desc: "Capacité à produire une grande tension musculaire. Elle sert à gagner les duels physiques, dominer au rebond, poser des écrans solides et protéger la balle. Amélioration : musculation lourde (squats, soulevés de terre, développés), gainage renforcé... Le tout avec augmentation progressive des charges." },
                        { icon: Zap, title: 'Vitesse', desc: "Aptitude à se déplacer rapidement ou à exécuter un geste très vite. Elle est la clé pour battre un adversaire en dribble, défendre sur un drive, ou mener à bien/empêcher les contre-attaque. Amélioration : sprints courts, changements de direction, échelle de rythme, travail de départs explosifs." },
                        { icon: Activity, title: 'Explosivité', desc: "Capacité à mobiliser sa force très rapidement, elle comprend la détente et les réflexes. En basketball, c'est sauter haut au panier, bondir pour un contre, accélérer violemment sur un drive, déclencher rapidement (shoot, passe). Amélioration : plyométrie (sauts, bonds), médecine ball, exercices de force-vitesse (sauts lestés, squats sautés)." },
                        { icon: Move, title: 'Mobilité', desc: "C'est l'amplitude des mouvements. A ne pas négliger pour prévenir les blessures, rester agile et sans raideur. Elle définit la capacité des tissus à encaisser une déformation sans céder. Amélioration : étirements dynamiques avant l'effort, statiques prolongés à distance, yoga, mobilité articulaire ciblée." },
                        { icon: Target, title: 'Qualité de mouvement', desc: "C'est la capacité à exécuter un geste juste, efficace et coordonné. Elle influe sur toutes les autres caractéristiques en optimisant la transmission de force. Utile dans la prévention de blessures. Amélioration : renforcement des chaînes musculaires profondes, correction posturale, exercices de motricité et de coordination." },
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 pt-1">
                                <item.icon className="w-8 h-8 text-cyan-900 stroke-[1.5]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-bold text-cyan-900 mb-1 uppercase tracking-wide flex items-center gap-2">
                                    <span className="text-cyan-800 text-sm font-normal">{idx + 1}.</span>
                                    {item.title}
                                </h3>
                                <p className="text-cyan-800 text-xs leading-relaxed text-justify">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* PAGE 3 - Données des tests */}
            <div className="w-[210mm] h-[297mm] bg-white p-12 flex flex-col page-break-after">
                <div className="grid grid-cols-2 gap-12 flex-1">
                    {/* Left: Data Table */}
                    <div className="flex flex-col">
                        <div className="mb-8 border-b border-cyan-600/50 pb-4">
                            <h2 className="text-2xl font-black text-cyan-900 uppercase tracking-tight mb-1">Données des tests</h2>
                            <p className="text-sm text-cyan-800 font-medium">Date : {date}</p>
                        </div>

                        <div className="border border-cyan-600/50">
                            <div className="bg-cyan-600/10 px-4 py-3 border-b border-cyan-600/50">
                                <div className="grid grid-cols-3 gap-4 text-cyan-900 font-bold text-xs uppercase tracking-wider">
                                    <div>Test</div>
                                    <div className="text-center">Joueur</div>
                                    <div className="text-center">Equipe</div>
                                </div>
                            </div>
                            <div className="divide-y divide-cyan-600/50">
                                {player.metrics.slice(0, 15).map((metric, idx) => (
                                    <div key={idx} className="grid grid-cols-3 gap-4 px-4 py-2 text-xs hover:bg-cyan-600/10 transition-colors">
                                        <div className="font-medium text-cyan-800">{metric.name}</div>
                                        <div className="text-center font-bold text-cyan-900">
                                            {formatValue(metric.value)}
                                        </div>
                                        <div className="text-center font-medium text-cyan-800">
                                            {team.metrics[idx] ? formatValue(team.metrics[idx].value) : '-'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Reading Guide */}
                    <div className="flex flex-col">
                        <div className="mb-8 border-b border-cyan-600/50 pb-4">
                            <h2 className="text-2xl font-black text-cyan-900 uppercase tracking-tight">Lecture du graphique</h2>
                        </div>

                        <div className="space-y-8 text-sm text-cyan-800 leading-relaxed text-justify">
                            <p>Pour prétendre à un niveau, il faut valider les conditions dans chaque caractéristique. Ainsi un joueur ayant 80 en vitesse et 40 sur toutes les caractéristiques ne pourra sûrement pas jouer en national, du moins pas dans ce sport.</p>

                            <p>Au basketball, il existe de grandes différences entre les postes. Ainsi un pivot n'aura pas à s'inquiéter autant de sa vitesse qu'un ailier, et inversement pour l'anatomie.</p>

                            <p>Le physique est important, mais dans un sport si complet, il y a des dizaines d'autres facteurs tels que l'adresse, la lecture de jeu etc... à prendre en compte. Ne voyez pas ces caractéristiques comme des limitations qui fixent votre niveau de jeu. Mais comme des points d'ancrage sur lesquels vous allez progresser si vous apprenez à travailler intelligemment avec votre corps.</p>
                        </div>
                    </div>
                </div>

                {/* Analyse de mouvement en pleine largeur sous les deux colonnes */}
                <div className="mt-10 p-6 bg-cyan-600/10 border border-cyan-600/50">
                    <div className="flex items-center justify-between mb-4 border-b border-cyan-600/50 pb-4">
                        <h3 className="text-lg font-bold text-cyan-900 uppercase tracking-tight">Analyse de mouvement</h3>
                        <div className="text-2xl font-black text-cyan-900">
                            8<span className="text-2xl text-cyan-800 font-medium">/10</span>
                        </div>
                    </div>
                    <div className="min-h-[50mm]">

                    </div>
                </div>
            </div>

            {/* PAGE 4 - Axes de progression */}
            <div className="w-[210mm] h-[297mm] bg-white p-12 flex flex-col">
                <div className="flex-1 space-y-8">
                    {/* Antécédents */}
                    <div className="bg-cyan-600/10 p-6 border border-cyan-600/50">
                        <div className="flex items-center justify-between mb-4 border-b border-cyan-600/50 pb-4">
                            <h2 className="text-lg font-bold text-cyan-900 uppercase tracking-tight">Antécédents</h2>
                        </div>
                        <div className="min-h-[35mm]">

                        </div>
                    </div>

                    {/* Commentaires */}
                    <div className="bg-cyan-600/10 p-6 border border-cyan-600/50">
                        <div className="flex items-center justify-between mb-4 border-b border-cyan-600/50 pb-4">
                            <h2 className="text-lg font-bold text-cyan-900 uppercase tracking-tight">Commentaires</h2>
                        </div>
                        <div className="min-h-[45mm]">

                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black text-cyan-900 uppercase tracking-tight mb-2">Axes de progression</h2>
                            <div className="w-12 h-1 bg-cyan-900 mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-cyan-600/10 p-6 border border-cyan-600/50 min-h-[50mm]">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-cyan-900" />
                                    <h3 className="text-lg font-bold text-cyan-900 uppercase tracking-tight">Prioritaires</h3>
                                </div>

                            </div>

                            <div className="bg-cyan-600/10 p-6 border border-cyan-600/50 min-h-[50mm]">
                                <div className="flex items-center gap-3 mb-6">
                                    <ClipboardList className="w-6 h-6 text-cyan-900" />
                                    <h3 className="text-lg font-bold text-cyan-900 uppercase tracking-tight">Secondaires</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimalist Footer */}
                <div className="h-16 flex border-t border-cyan-600/50">
                    <div className="w-1/2 flex items-center justify-center border-r border-cyan-600/50">
                        <div className="text-center">
                            <p className="text-sm font-black text-cyan-900 uppercase tracking-wider">KineTeam</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex items-center justify-center bg-cyan-600/10">
                        <div className="text-center text-cyan-800 text-xs font-medium">
                            <p>kineteam87@gmail.com • 05 55 32 23 38</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ReportCard.displayName = 'ReportCard';
