import { FolderOpenDot, Plus, Users } from "lucide-react";
import { motion } from "framer-motion";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { SceneArtwork } from "../components/SceneArtwork";
import { collaborateProjects } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function ProjectsPage() {
  const language = useAppStore((state) => state.language);
  const pushToast = useAppStore((state) => state.pushToast);

  return (
    <div>
      <PageHeading
        eyebrow="Project Center"
        title={language === "ar" ? "كل مشاريعك في لوحة واحدة" : "All your projects in one control center"}
        description={
          language === "ar"
            ? "استعرض المشاريع، حالة التقدم، وعدد المتعاونين قبل الدخول إلى مساحات التحرير المختلفة."
            : "Review progress, collaborators, and visual identity before jumping into any editing space."
        }
        action={
          <button
            type="button"
            className="neon-button gap-2"
            onClick={() =>
              pushToast(language === "ar" ? "تم إنشاء مسودة" : "Draft Created", language === "ar" ? "تم إعداد مشروع جديد باسم New Project." : "A new draft project has been created.")
            }
          >
            <Plus size={16} />
            <span>{language === "ar" ? "مشروع جديد" : "New Project"}</span>
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.08fr,0.92fr]">
        <NeonCard title={language === "ar" ? "المشاريع الحالية" : "Current Projects"}>
          <div className="grid gap-4 md:grid-cols-2">
            {collaborateProjects.map((project) => (
              <motion.button
                key={project.id}
                whileHover={{ y: -4 }}
                type="button"
                className="glass-panel-soft overflow-hidden text-left"
                onClick={() =>
                  pushToast(
                    language === "ar" ? "فتح المشروع" : "Project Opened",
                    language === "ar" ? `تم تحضير ${project.name} للعرض.` : `${project.name} is ready to open.`
                  )
                }
              >
                <SceneArtwork variant={project.scene} className="h-44 rounded-none" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{project.name}</div>
                      <div className="mt-1 text-xs text-white/45">{project.updated}</div>
                    </div>
                    <div className="value-badge">{project.progress}%</div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                    <span>{project.clips} clips</span>
                    <span>{project.collaborators} collaborators</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <NeonCard title={language === "ar" ? "إحصاءات الفريق" : "Team Snapshot"}>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: FolderOpenDot, labelAr: "المشاريع النشطة", labelEn: "Active Projects", value: "12" },
                { icon: Users, labelAr: "المتعاونون", labelEn: "Collaborators", value: "31" },
                { icon: FolderOpenDot, labelAr: "جاهزة للتسليم", labelEn: "Ready to Deliver", value: "04" },
                { icon: Users, labelAr: "جلسات المراجعة", labelEn: "Review Sessions", value: "09" }
              ].map((item) => (
                <div key={item.value + item.labelEn} className="glass-panel-soft p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">{item.value}</span>
                    <item.icon size={17} className="text-neon-cyan" />
                  </div>
                  <div className="mt-2 text-xs text-white/45">{language === "ar" ? item.labelAr : item.labelEn}</div>
                </div>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "المهام القادمة" : "Upcoming Tasks"}>
            <div className="space-y-3">
              {(language === "ar"
                ? ["مراجعة التلوين النهائي", "إضافة شعار متحرك", "رفع المؤثرات الصوتية الجديدة", "جدولة التصدير النهائي"]
                : ["Review final color grade", "Add animated logo", "Upload new sound effects", "Schedule final export"]
              ).map((item, index) => (
                <div key={item} className="glass-panel-soft flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-white/75">{item}</span>
                  <span className="text-xs text-white/35">0{index + 1}</span>
                </div>
              ))}
            </div>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
