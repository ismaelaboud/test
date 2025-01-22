import ModuleDetails from "./ModuleDetails";
import AddButton from "./AddButton";

const CourseModules = ({ form, addModule }: any) => {
  const modules = form.watch("modules");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Modules</h3>
      {modules.map((module: any, index: number) => (
        <ModuleDetails key={index} form={form} module={module} index={index} />
      ))}
      <AddButton onClick={addModule} label="Add Module" />
    </div>
  );
};

export default CourseModules;
