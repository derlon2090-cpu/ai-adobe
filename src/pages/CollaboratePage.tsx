import { MessageSquareMore, Plus, UserPlus } from "lucide-react";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { SceneArtwork } from "../components/SceneArtwork";
import { collaborateProjects, collaborators } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function CollaboratePage() {
  const language = useAppStore((state) => state.language);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);
  const selectProject = useAppStore((state) => state.selectProject);
  const pushToast = useAppStore((state) => state.pushToast);
  const selectedProject = collaborateProjects.find((project) => project.id === selectedProjectId) ?? collaborateProjects[0];

  return (
    <div>
      <PageHeading
        eyebrow="Collaboration Hub"
        title={language === "ar" ? "التعاون المباشر على المشاريع" : "Real-time project collaboration"}
        description={
          language === "ar"
            ? "تابع التقدم، أعضاء الفريق، النشاطات، والمهام من مساحة واحدة مع محاكاة حيّة للتايملاين المشتركة."
            : "Track progress, collaborators, tasks, and activity in a dense collaboration-focused control room."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[260px,1fr,320px]">
        <div className="grid gap-5">
          <NeonCard title={language === "ar" ? "المشروع النشط" : "Active Project"}>
            <div className="scene-card h-40">
              <SceneArtwork variant={selectedProject.scene} className="h-full w-full rounded-none" />
            </div>
            <div className="mt-4 text-lg font-semibold text-white">{selectedProject.name}</div>
            <div className="mt-1 text-sm text-white/45">{selectedProject.updated}</div>
            <button
              type="button"
              className="neon-button mt-4 w-full"
              onClick={() =>
                pushToast(language === "ar" ? "تم فتح المشروع" : "Project Opened", language === "ar" ? `${selectedProject.name} جاهز للمراجعة.` : `${selectedProject.name} is ready to review.`)
              }
            >
              {language === "ar" ? "فتح المشروع" : "Open Project"}
            </button>
          </NeonCard>

          <NeonCard title={language === "ar" ? "كل المشاريع" : "All Projects"}>
            <div className="space-y-2">
              {collaborateProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => selectProject(project.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                    project.id === selectedProject.id
                      ? "border border-neon-violet/25 bg-neon-violet/12 text-white"
                      : "border border-white/8 bg-white/[0.03] text-white/68 hover:bg-white/[0.05]"
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold">{project.name}</div>
                    <div className="mt-1 text-xs text-white/40">{project.updated}</div>
                  </div>
                  <span className="value-badge">{project.clips}</span>
                </button>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "الفرق" : "Teams"}>
            <div className="space-y-2">
              {["Orzain Studio", "Marketing Team", "Freelance Editors", "Clients"].map((team, index) => (
                <div key={team} className="glass-panel-soft flex items-center justify-between px-4 py-3 text-sm text-white/75">
                  <span>{team}</span>
                  <span className="text-xs text-white/35">{8 - index}</span>
                </div>
              ))}
            </div>
          </NeonCard>
        </div>

        <div className="grid gap-5">
          <NeonCard
            title={selectedProject.name}
            subtitle="4K (3840x2160) • 60fps • Last saved just now"
            action={
              <button
                type="button"
                className="ghost-button gap-2"
                onClick={() =>
                  pushToast(language === "ar" ? "تمت الدعوة" : "Invite Sent", language === "ar" ? "تمت دعوة عضو جديد إلى المشروع." : "A new collaborator has been invited.")
                }
              >
                <UserPlus size={15} />
                <span>{language === "ar" ? "دعوة" : "Invite"}</span>
              </button>
            }
          >
            <div className="grid gap-4 xl:grid-cols-[0.95fr,1.05fr]">
              <div className="glass-panel-soft p-4">
                <div className="text-sm font-semibold text-white">{language === "ar" ? "تقدم المشروع" : "Project Progress"}</div>
                <div className="mt-4 flex items-center gap-5">
                  <div className="relative h-32 w-32 rounded-full bg-[conic-gradient(from_90deg,#8b5cf6_0_72%,rgba(255,255,255,0.08)_72%_100%)] p-2">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-surface-900 text-3xl font-semibold text-white">
                      72%
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-white/65">
                    <div>{language === "ar" ? "مكتمل: 72%" : "Completed: 72%"}</div>
                    <div>{language === "ar" ? "قيد العمل: 18%" : "In Progress: 18%"}</div>
                    <div>{language === "ar" ? "لم يبدأ: 10%" : "Not Started: 10%"}</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel-soft p-4">
                <div className="text-sm font-semibold text-white">{language === "ar" ? "المتعاونون" : "Collaborators"}</div>
                <div className="mt-4 space-y-3">
                  {collaborators.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{item.name}</div>
                        <div className="text-xs text-white/40">{item.role}</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/55">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.status === "Online" ? "bg-emerald-400" : item.status === "In App" ? "bg-cyan-400" : item.status === "Reviewing" ? "bg-violet-400" : "bg-white/20"}`} />
                        <span>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 glass-panel-soft p-4">
              <div className="mb-3 text-sm font-semibold text-white">{language === "ar" ? "Live Timeline" : "Live Timeline"}</div>
              <div className="relative overflow-hidden rounded-[1.4rem] border border-white/8 bg-black/28 p-4">
                <div className="absolute bottom-4 top-4 left-[42%] w-px bg-neon-cyan shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
                <div className="space-y-3">
                  {[
                    { track: "V3 Titles", color: "from-violet-500/40 to-fuchsia-500/15", owner: "Lina" },
                    { track: "V2 Video", color: "from-indigo-500/35 to-cyan-400/12", owner: "Ahmed" },
                    { track: "A1 Music", color: "from-emerald-400/30 to-teal-400/10", owner: "Omar" },
                    { track: "A2 SFX", color: "from-cyan-400/30 to-blue-500/10", owner: "Fahad" },
                    { track: "A3 Voice", color: "from-fuchsia-500/30 to-violet-500/10", owner: "Sarah" }
                  ].map((row, index) => (
                    <div key={row.track} className="grid grid-cols-[110px,1fr] gap-3">
                      <div className="text-sm text-white/55">{row.track}</div>
                      <div className="relative h-12 rounded-2xl border border-white/8 bg-white/[0.02]">
                        <div className={`absolute top-1.5 h-9 rounded-xl border bg-gradient-to-r ${row.color}`} style={{ left: `${index * 7}%`, width: `${52 - index * 4}%` }} />
                        <span className="absolute right-2 top-1.5 rounded-full bg-black/40 px-2 py-1 text-[10px] text-white/70">{row.owner}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[1fr,0.85fr]">
              <NeonCard title={language === "ar" ? "المهام" : "Tasks"}>
                <div className="space-y-3">
                  {(language === "ar"
                    ? ["مراجعة واعتماد التلوين", "إضافة شعار متحرك", "تصميم صوتي للانتقالات", "الرندر النهائي والتسليم"]
                    : ["Review and approve color grading", "Add animated logo", "Sound design for transitions", "Final render and delivery"]
                  ).map((item, index) => (
                    <div key={item} className="glass-panel-soft flex items-center justify-between px-4 py-3 text-sm text-white/75">
                      <span>{item}</span>
                      <span className="text-xs text-white/35">P{index + 1}</span>
                    </div>
                  ))}
                </div>
              </NeonCard>

              <NeonCard title={language === "ar" ? "الملاحظات" : "Notes"}>
                <div className="space-y-3">
                  {["Client feedback v2", "References", "Shot list"].map((item) => (
                    <div key={item} className="glass-panel-soft flex items-center gap-3 px-4 py-3 text-sm text-white/75">
                      <MessageSquareMore size={15} className="text-neon-cyan" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </NeonCard>
            </div>
          </NeonCard>
        </div>

        <div className="grid gap-5">
          <NeonCard title={language === "ar" ? "النشاطات" : "Activity Feed"}>
            <div className="space-y-3">
              {[
                "Sarah Alharbi updated the timeline",
                "Omar Khateeb adjusted color grade",
                "Lina Faisal added lower third",
                "Fahad uploaded new sound effect",
                "Ahmed changed project settings"
              ].map((item, index) => (
                <div key={item} className="glass-panel-soft px-4 py-3">
                  <div className="text-sm text-white/75">{item}</div>
                  <div className="mt-1 text-xs text-white/35">{index === 0 ? "Just now" : `${index * 8} min ago`}</div>
                </div>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "دردشة الفريق" : "Team Chat"} action={<button type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0"><Plus size={14} /></button>}>
            <div className="space-y-3">
              {[
                { name: "Sarah Alharbi", text: "@Ahmed Can you check the intro part?" },
                { name: "Omar Khateeb", text: "I pushed a new color look." },
                { name: "Lina Faisal", text: "Looks amazing!" }
              ].map((message) => (
                <div key={message.text} className="glass-panel-soft px-4 py-3">
                  <div className="text-xs text-white/35">{message.name}</div>
                  <div className="mt-2 text-sm text-white/78">{message.text}</div>
                </div>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "التخزين والمزامنة" : "Storage & Sync"}>
            <div className="text-sm text-white/75">256.7 GB / 1 TB (25%)</div>
            <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
              <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan" />
            </div>
            <button type="button" className="ghost-button mt-4 w-full">{language === "ar" ? "إدارة التخزين" : "Manage Storage"}</button>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
