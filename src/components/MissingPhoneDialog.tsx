import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface MissingPhoneDialogProps {
  open: boolean
  defaultValue?: string
  onSubmit: (phone: string) => void
  onCancel: () => void
}

/**
 * Fallback dialog shown when a wallet payment (Google Pay / Apple Pay) does not
 * return a phone number — even when requestPayerPhone:true is set.
 *
 * Matches Plieggo's design system (cream/burgundy/terracotta palette).
 */
export function MissingPhoneDialog({
  open,
  defaultValue = '',
  onSubmit,
  onCancel,
}: MissingPhoneDialogProps) {
  const [value, setValue] = useState(defaultValue)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    const digits = value.replace(/\D/g, '')
    if (digits.length < 7) {
      setError('Ingresa un número de teléfono válido (mínimo 7 dígitos).')
      return
    }
    setError('')
    onSubmit(value.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel() }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>¿Cuál es tu número de teléfono?</DialogTitle>
          <DialogDescription>
            Lo necesitamos para coordinar tu envío. No se usa para publicidad.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="missing-phone">Teléfono</Label>
            <Input
              id="missing-phone"
              type="tel"
              placeholder="+52 55 1234 5678"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
            >
              Continuar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}