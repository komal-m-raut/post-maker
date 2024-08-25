import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider> & {
  updateStyle: (size: number) => void;
};

export const FontSizeSlider = ({ className, ...props }: SliderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-slate-600">Font size</label>
      <Slider
        defaultValue={[18]}
        max={32}
        min={16}
        step={2}
        className={cn("w-full", className)}
        {...props}
        onValueChange={(value) => props.updateStyle(value[0])}
      />
    </div>
  );
};

export const FontWeightSlider = ({ className, ...props }: SliderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-slate-600">Font Weight</label>
      <Slider
        defaultValue={[500]}
        max={900}
        min={100}
        step={100}
        className={cn("w-full", className)}
        {...props}
        onValueChange={(value) => props.updateStyle(value[0])}
      />
    </div>
  );
};

export const ColorPicker = ({
  updateStyle,
}: {
  updateStyle: (color: string) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    updateStyle(newColor);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-slate-600">Change Color</label>
      <div className="relative">
        <input
          type="color"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center bg-white">
          <span
            className="block w-6 h-6 rounded-full"
            style={{
              background: selectedColor
                ? selectedColor
                : "linear-gradient(to right, #ff7e5f, #feb47b)",
            }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export const AlignmentButtons = ({
  updateStyle,
}: {
  updateStyle: (alignment: string) => void;
}) => {
  return (
<div className="flex flex-col gap-2">
<label className="text-sm text-slate-600">Align your content</label>      <RadioGroup
        defaultValue="center"
        onValueChange={(value: string) => updateStyle(value)}
      >
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="left" id="left" />
            <label htmlFor="left">Left</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="center" id="center" />
            <label htmlFor="center">Center</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="right" id="right" />
            <label htmlFor="right">Right</label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
