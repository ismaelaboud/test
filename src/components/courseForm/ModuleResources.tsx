import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ModuleResources = ({ form, moduleIndex }: any) => {
    const resources = form.watch(`modules.${moduleIndex}.resources`);

    const addResource = () => {
        const currentResources = form.getValues(`modules.${moduleIndex}.resources`) || [];
        form.setValue(`modules.${moduleIndex}.resources`, [
            ...currentResources,
            { title: "", type: "document", url: "" },
        ]);
    };

    return (
        <div className="space-y-4">
            <h5 className="text-sm font-semibold">Resources</h5>
            {resources.map((_, index: number) => (
                <div key={index} className="border rounded-md p-4">
                    <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.resources.${index}.title`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resource Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter resource title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.resources.${index}.type`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resource Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select resource type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="document">Document</SelectItem>
                                        <SelectItem value="video">Video</SelectItem>
                                        <SelectItem value="link">Link</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.resources.${index}.url`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resource URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter resource URL" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            ))}
            <Button variant="outline" onClick={addResource}>
                Add Resource
            </Button>
        </div>
    );
};

export default ModuleResources;
