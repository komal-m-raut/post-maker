import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type SliderProps = React.ComponentProps<typeof Slider> & {
  updateStyle: (size: number) => void;
};

export const FontSizeSlider = ({ className, ...props }: SliderProps) => {
  return (
    <Slider
      defaultValue={[18]}
      max={32}
      min={16}
      step={2}
      className={cn("w-full", className)}
      {...props}
      onValueCommit={(value) => props.updateStyle(value[0])}
    />
  );
};

export const FontWeightSlider = ({ className, ...props }: SliderProps) => {
  return (
    <Slider
      defaultValue={[500]}
      max={900}
      min={100}
      step={100}
      className={cn("w-full", className)}
      {...props}
      onValueCommit={(value) => props.updateStyle(value[0])}
    />
  );
};

export const ColorPicker = ({
  updateStyle,
}: {
  updateStyle: (color: string) => void;
}) => {
  return (
    <input
      type="color"
      onChange={(event) => updateStyle(event.target.value)}
      className="w-full h-10 p-1 border rounded"
    />
  );
}
export const AlignmentButtons = ({
  updateStyle,
}: {
  updateStyle: (alignment: string) => void;
}) => {
  return (
    <RadioGroup
      defaultValue="left"
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
  );
};
