import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

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
