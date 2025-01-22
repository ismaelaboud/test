import ModuleExercises from "./ModuleExercises";
import ModuleResources from "./ModuleResources";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ModuleDetails = ({ form, module, index }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Module {index + 1}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name={`modules.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter module title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`modules.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter module description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Exercises */}
        <ModuleExercises form={form} moduleIndex={index} />

        {/* Resources */}
        <ModuleResources form={form} moduleIndex={index} />
      </CardContent>
    </Card>
  );
};

export default ModuleDetails;
