import { forwardRef } from 'react';
import type { PlayerData, TeamData } from '../utils/excelParser';
import { RadarChart } from './RadarChart';
import { BarChart } from './BarChart';
import {
    User,
    Heart,
    Dumbbell,
    Zap,
    Activity,
    Move,
    Target,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    ClipboardList
} from 'lucide-react';

interface Props {
    player: PlayerData;
    team: TeamData;
    date?: string;
    teamName?: string;
}

export const ReportCard = forwardRef<HTMLDivElement, Props>(({ player, team, date = "28/08/2025", teamName = "Basket Club Test 2" }, ref) => {
    return (
        <div ref={ref} className="bg-white font-sans text-slate-900">
            {/* PAGE 1 - Cover & Charts */}
            <div className="w-[210mm] h-[297mm] bg-white flex flex-col relative overflow-hidden page-break-after">
                {/* Clean Flat Header */}
                <div className="h-[85mm] flex">
                    <div className="w-1/2 bg-[#22d3ee] p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">KineTeam</h1>
                            <div className="space-y-1.5 text-slate-800">
                                <p className="font-bold text-sm">BOY Antoine, BROS Thomas, BARUSSEAU Corentin</p>
                                <p className="text-sm font-medium">Kinésithérapeutes du sport</p>
                                <p className="text-sm">1 rue Jean Nouailher 87000 Limoges</p>
                                <p className="text-sm font-medium">kineteam87@gmail.com</p>
                                <p className="text-sm font-bold">05 55 32 23 38</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 bg-[#ea580c] flex items-center justify-center p-8">
                        <div className="text-center text-white">
                            <h2 className="text-4xl font-black uppercase leading-tight mb-4 tracking-tight">
                                ÉVALUATION<br />PHYSIQUE<br />D'EQUIPE
                            </h2>
                            <div className="inline-block border-2 border-white px-6 py-2">
                                <p className="text-lg font-bold uppercase tracking-widest">par MKDE</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8">
                    <div className="grid grid-cols-2 gap-10 h-full">
                        {/* Left Column: Radar Chart */}
                        <div className="flex flex-col space-y-6">
                            {/* Player Info - Minimalist */}
                            <div className="border-l-4 border-slate-900 pl-4 py-1">
                                <div className="grid grid-cols-1 gap-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider w-16">Joueur</span>
                                        <span className="text-lg font-bold text-slate-900">{player.name}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider w-16">Equipe</span>
                                        <span className="text-lg font-bold text-slate-900">{teamName}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider w-16">Date</span>
                                        <span className="text-lg font-bold text-slate-900">{date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Radar Chart */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex-1 relative min-h-[300px]">
                                    <RadarChart playerScores={player.scores} teamScores={team.scores} />
                                </div>

                                <div className="mt-4 flex justify-center gap-8 border-t border-slate-200 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-[#1e3a8a]"></div>
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">JOUEUR</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-[#dc2626]"></div>
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">EQUIPE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Score Reference Table - Clean */}
                            <div className="border border-slate-200">
                                <div className="grid grid-cols-2 bg-slate-100 border-b border-slate-200">
                                    <div className="py-2 text-center font-bold text-slate-700 text-xs uppercase tracking-wider border-r border-slate-200">Score</div>
                                    <div className="py-2 text-center font-bold text-slate-700 text-xs uppercase tracking-wider">Niveau</div>
                                </div>
                                <div className="divide-y divide-slate-200 text-sm">
                                    {[
                                        { score: '0-30', level: 'Loisir' },
                                        { score: '30-50', level: 'Départ' },
                                        { score: '50-70', level: 'Région' },
                                        { score: '70-90', level: 'National' },
                                        { score: '90-100', level: 'Pro' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-2">
                                            <div className="py-1.5 text-center font-medium text-slate-600 border-r border-slate-200">{item.score}</div>
                                            <div className="py-1.5 text-center font-bold text-slate-800">{item.level}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Bar Chart */}
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-3">
                                <TrendingUp className="w-5 h-5 text-slate-900" />
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Comparaison</h3>
                            </div>
                            <div className="h-[85mm]">
                                <BarChart playerMetrics={player.metrics} teamMetrics={team.metrics} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 2 - Caractéristiques */}
            <div className="w-[210mm] h-[297mm] bg-white p-12 flex flex-col page-break-after">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Caractéristiques physiques</h2>
                    <div className="w-16 h-1 bg-slate-900 mx-auto"></div>
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
                                <item.icon className="w-8 h-8 text-slate-900 stroke-[1.5]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-bold text-slate-900 mb-1 uppercase tracking-wide flex items-center gap-2">
                                    <span className="text-slate-400 text-sm font-normal">{idx + 1}.</span>
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 text-xs leading-relaxed text-justify">{item.desc}</p>
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
                        <div className="mb-8 border-b border-slate-200 pb-4">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-1">Données des tests</h2>
                            <p className="text-sm text-slate-500 font-medium">Date : {date}</p>
                        </div>

                        <div className="border border-slate-200">
                            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                                <div className="grid grid-cols-3 gap-4 text-slate-900 font-bold text-xs uppercase tracking-wider">
                                    <div>Test</div>
                                    <div className="text-center">Joueur</div>
                                    <div className="text-center">Equipe</div>
                                </div>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {player.metrics.slice(0, 15).map((metric, idx) => (
                                    <div key={idx} className="grid grid-cols-3 gap-4 px-4 py-2 text-xs hover:bg-slate-50 transition-colors">
                                        <div className="font-medium text-slate-600">{metric.name}</div>
                                        <div className="text-center font-bold text-slate-900">{metric.value}</div>
                                        <div className="text-center font-medium text-slate-500">{team.metrics[idx]?.value || '-'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-slate-50 border border-slate-100">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-4">
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Analyse de mouvement</h3>
                                <div className="text-3xl font-black text-slate-900">8<span className="text-lg text-slate-400 font-medium">/10</span></div>
                            </div>
                            <ul className="text-sm space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                    <span>Très bonne amplitude</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                    <span>Bonne répartition des charges</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    <span>Inclinaison antérieure du tronc surtout en lombaire</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    <span>Fente latérale droite moins bien stabilisée</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    <span>Orteils qui se lèvent en fin d'amplitude</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Reading Guide */}
                    <div className="flex flex-col">
                        <div className="mb-8 border-b border-slate-200 pb-4">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Lecture du graphique</h2>
                        </div>

                        <div className="space-y-8 text-sm text-slate-600 leading-relaxed text-justify">
                            <p>Pour prétendre à un niveau, il faut valider les conditions dans chaque caractéristique. Ainsi un joueur ayant 80 en vitesse et 40 sur toutes les caractéristiques ne pourra sûrement pas jouer en national, du moins pas dans ce sport.</p>

                            <p>Au basketball, il existe de grandes différences entre les postes. Ainsi un pivot n'aura pas à s'inquiéter autant de sa vitesse qu'un ailier, et inversement pour l'anatomie.</p>

                            <p>Le physique est important, mais dans un sport si complet, il y a des dizaines d'autres facteurs tels que l'adresse, la lecture de jeu etc... à prendre en compte. Ne voyez pas ces caractéristiques comme des limitations qui fixent votre niveau de jeu. Mais comme des points d'ancrage sur lesquels vous allez progresser si vous apprenez à travailler intelligemment avec votre corps.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 4 - Axes de progression */}
            <div className="w-[210mm] h-[297mm] bg-white p-12 flex flex-col">
                <div className="flex-1">
                    <div className="mb-12">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 border-b border-slate-200 pb-4">Antécédents</h2>
                        <div className="pl-4 border-l-2 border-slate-200">
                            <ul className="text-sm space-y-2 text-slate-600">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                    <span>Aucun antécédent déclaré</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 border-b border-slate-200 pb-4">Commentaires</h2>
                        <div className="pl-4 border-l-2 border-slate-200">
                            <ul className="text-sm space-y-4 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                                    <span className="font-bold text-slate-900">Bonnes capacités cardio-vasculaire, de mouvement et de vitesse.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                                    <span className="font-bold text-slate-900">Nécessité d'optimiser le mécanisme de recrutement musculaire.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>Capacités physiques globales très bonnes comparé au niveau de votre champion. Se concentrer sur les aspects techniques pour gagner en niveau.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Axes de progression</h2>
                            <div className="w-12 h-1 bg-slate-900 mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 border border-slate-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-slate-900" />
                                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Prioritaires</h3>
                                </div>
                                <ul className="text-sm space-y-4 text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <span className="text-slate-400 font-bold">→</span>
                                        <span>Évaluation du profil force/vitesse afin d'ajuster les principes de renforcement musculaire.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-slate-400 font-bold">→</span>
                                        <span>Renforcement du membre inférieur droit en charge, notamment mollet.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-slate-50 p-6 border border-slate-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <ClipboardList className="w-6 h-6 text-slate-900" />
                                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Secondaires</h3>
                                </div>
                                <ul className="text-sm space-y-4 text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <span className="text-slate-400 font-bold">→</span>
                                        <span>Travail de force globale corps complet.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-slate-400 font-bold">→</span>
                                        <span>Transferts verticalité/horizontalité. D'abord à basse vélocité puis à haute vitesse.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-slate-400 font-bold">→</span>
                                        <span>Travail mental sur la mise en charge du membre inférieur droit.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimalist Footer */}
                <div className="h-16 flex border-t border-slate-200">
                    <div className="w-1/2 flex items-center justify-center border-r border-slate-200">
                        <div className="text-center">
                            <p className="text-sm font-black text-slate-900 uppercase tracking-wider">KineTeam</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex items-center justify-center bg-slate-50">
                        <div className="text-center text-slate-500 text-xs font-medium">
                            <p>kineteam87@gmail.com • 05 55 32 23 38</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ReportCard.displayName = 'ReportCard';
