import Button from "./Button";

export default function PropertiesScreen() {
  const addProperty = async () => {};

  return (
    <div>
      <Button onClick={addProperty}>Add property</Button>
    </div>
  );
}

function Property() {
  return (
    <div>
      <h1>Single Property</h1>
    </div>
  );
}
