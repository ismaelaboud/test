import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ModuleExercises = ({ form, moduleIndex }: any) => {
  const exercises = form.watch(`modules.${moduleIndex}.exercises`);

  const addExercise = () => {
    const currentExercises = form.getValues(`modules.${moduleIndex}.exercises`) || [];
    form.setValue(`modules.${moduleIndex}.exercises`, [
      ...currentExercises,
      { title: "", instructions: "" },
    ]);
  };

  return (
    <div className="space-y-4">
      <h5 className="text-sm font-semibold">Exercises</h5>
      {exercises.map((_, index: number) => (
        <div key={index} className="border rounded-md p-4">
          <FormField
            control={form.control}
            name={`modules.${moduleIndex}.exercises.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter exercise title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button variant="outline" onClick={addExercise}>
        Add Exercise
      </Button>
    </div>
  );
};

export default ModuleExercises;
