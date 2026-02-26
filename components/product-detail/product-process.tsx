"use client"

import { useFadeAnimation } from "@/lib/use-fade-animation"
import { Upload, MessageSquare, Cpu, Download } from "lucide-react"

const stepIcons = [
  <Upload key="1" className="h-6 w-6" />,
  <MessageSquare key="2" className="h-6 w-6" />,
  <Cpu key="3" className="h-6 w-6" />,
  <Download key="4" className="h-6 w-6" />,
]

interface Step {
  step: string
  title: string
  description: string
}

export function ProductProcess({ steps }: { steps: Step[] }) {
  const ref = useFadeAnimation()

  return (
    <section ref={ref} className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p
            data-animate
            className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
          >
            PROCESS
          </p>
          <h2
            data-animate
            className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
          >
            How It <span className="italic">Works</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.step}
              data-animate
              className={`fade-up relative flex flex-col items-center text-center delay-${
                (i + 1) * 100
              }`}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-border lg:block" />
              )}

              <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                {stepIcons[i]}
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-1.5 text-base font-bold text-foreground">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
