import FormField from "@/components/FormField";

export default function Contact() {
  return (
    <div className="p-6 md:p-10 lg:p-14 lg:px-96">
      <h1 className="lg:px-48 text-3xl font-bold">Write us a message</h1>
      <form className="flex flex-col gap-4 lg:px-48" name="contact" netlify>
        <FormField fieldName="name" placeholder="Name" label="Name" />
        <FormField fieldName="email" placeholder="Email" label="Email" />
        <p>
          <label className="flex flex-col">
            Message{" "}
            <textarea
              className="border-2 border-black"
              name="message"
              cols="30"
              rows="10"
            ></textarea>
          </label>
        </p>
        <button type="submit" className="text-sky-500">
          Submit
        </button>
      </form>
    </div>
  );
}
