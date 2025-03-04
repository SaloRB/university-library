import { HexColorInput, HexColorPicker } from 'react-colorful'

interface ColorPickerProps {
  value?: string
  onPickerChange: (color: string) => void
}

const ColorPicker = ({ value, onPickerChange }: ColorPickerProps) => {
  return (
    <div className="color-picker">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  )
}

export default ColorPicker
