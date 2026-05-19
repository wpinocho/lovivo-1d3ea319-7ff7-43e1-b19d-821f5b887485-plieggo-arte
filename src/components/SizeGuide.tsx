import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * SizeGuide — Visualizador de tamaños proporcional a escala
 * Aparece como link colapsable debajo del selector de medidas.
 * Muestra SVG boxes proporcionales + silueta humana de referencia (165 cm).
 */

// Parsea "50x50cm" → { w: 50, h: 50 }
function parseDimension(value: string): { w: number; h: number } | null {
  const match = value
    .toLowerCase()
    .replace(/\s/g, "")
    .match(/^(\d+)x(\d+)/)
  if (!match) return null
  return { w: parseInt(match[1]), h: parseInt(match[2]) }
}

// Referencia humana en texto (opcional)
const SIZE_HINTS: Record<string, string> = {
  "20x20": "2 fotos polaroid",
  "30x30": "Un vinilo LP",
  "50x50": "2 hojas carta juntas",
  "80x80": "Punto focal de pared",
  "30x90": "Panel panorámico",
  "100x100": "Pieza grande de colección",
}

interface SizeGuideProps {
  /** Todos los valores del option de tamaño, ej: ["50x50cm", "80x80cm"] */
  optionValues: string[]
  /** Valor actualmente seleccionado */
  selectedValue?: string
}

export function SizeGuide({ optionValues, selectedValue }: SizeGuideProps) {
  const [open, setOpen] = useState(false)

  // Solo parsear valores que tienen forma de medida
  const sizes = optionValues
    .map((v) => ({ label: v, dims: parseDimension(v) }))
    .filter((s): s is { label: string; dims: { w: number; h: number } } =>
      s.dims !== null
    )

  // No mostrar si hay menos de 2 tamaños parseables
  if (sizes.length < 2) return null

  // Escala: persona = 165 cm, capped at 180px de alto
  const PERSON_PX = 180
  const SCALE = Math.min(
    100 / Math.max(...sizes.flatMap((s) => [s.dims.w, s.dims.h])),
    PERSON_PX / 165
  )
  const CANVAS_H = PERSON_PX + 24 // 24px baseline padding

  return (
    <div className="mt-2">
      {/* Toggle link */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-xs text-[#C16648] hover:opacity-75 transition-opacity"
      >
        <span>¿Cómo se ve en tu pared?</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Collapsible panel */}
      {open && (
        <div className="mt-3 p-4 rounded-xl border border-border/50 bg-muted/20 overflow-x-auto">
          <p className="text-[11px] text-muted-foreground mb-4 leading-snug">
            A escala aproximada · La figura representa 165 cm de altura
          </p>

          <div
            className="flex items-end gap-6"
            style={{ minHeight: CANVAS_H }}
          >
            {/* Silueta humana de referencia */}
            <div className="flex flex-col items-center gap-1 shrink-0 self-end">
              <svg
                width="22"
                height={PERSON_PX}
                viewBox={`0 0 22 ${PERSON_PX}`}
                fill="none"
                aria-hidden="true"
              >
                {/* Cabeza */}
                <circle
                  cx="11"
                  cy="8"
                  r="7"
                  className="fill-muted-foreground/30"
                />
                {/* Cuerpo */}
                <rect
                  x="6"
                  y="17"
                  width="10"
                  height="Math.round(PERSON_PX * 0.3)"
                  rx="2"
                  className="fill-muted-foreground/30"
                  height={Math.round(PERSON_PX * 0.3)}
                />
                {/* Brazo izq */}
                <rect
                  x="0"
                  y="19"
                  width="6"
                  height="4"
                  rx="2"
                  className="fill-muted-foreground/30"
                />
                {/* Brazo der */}
                <rect
                  x="16"
                  y="19"
                  width="6"
                  height="4"
                  rx="2"
                  className="fill-muted-foreground/30"
                />
                {/* Pierna izq */}
                <rect
                  x="6"
                  y={17 + Math.round(PERSON_PX * 0.3) + 2}
                  width="4"
                  height={PERSON_PX - 17 - Math.round(PERSON_PX * 0.3) - 4}
                  rx="2"
                  className="fill-muted-foreground/30"
                />
                {/* Pierna der */}
                <rect
                  x="12"
                  y={17 + Math.round(PERSON_PX * 0.3) + 2}
                  width="4"
                  height={PERSON_PX - 17 - Math.round(PERSON_PX * 0.3) - 4}
                  rx="2"
                  className="fill-muted-foreground/30"
                />
              </svg>
              <span className="text-[10px] text-muted-foreground/50 whitespace-nowrap">
                165 cm
              </span>
            </div>

            {/* Divider */}
            <div className="w-px self-stretch bg-border/40 shrink-0" />

            {/* Cuadros a escala */}
            {sizes.map(({ label, dims }) => {
              const isSelected = label === selectedValue
              const boxW = Math.max(Math.round(dims.w * SCALE), 18)
              const boxH = Math.max(Math.round(dims.h * SCALE), 18)
              const hintKey = `${dims.w}x${dims.h}`
              const hint = SIZE_HINTS[hintKey]

              return (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 shrink-0 self-end"
                >
                  {/* Box */}
                  <div
                    style={{ width: boxW, height: boxH }}
                    className={cn(
                      "rounded border-2 transition-all duration-200",
                      isSelected
                        ? "border-[#C16648] bg-[#C16648]/15 shadow-sm"
                        : "border-muted-foreground/30 bg-muted/40"
                    )}
                  />
                  {/* Dimensiones */}
                  <span
                    className={cn(
                      "text-[11px] font-semibold whitespace-nowrap transition-colors",
                      isSelected
                        ? "text-[#C16648]"
                        : "text-foreground/60"
                    )}
                  >
                    {label}
                  </span>
                  {/* Hint de referencia */}
                  {hint && (
                    <span className="text-[10px] text-muted-foreground/60 text-center leading-tight max-w-[72px]">
                      {hint}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}