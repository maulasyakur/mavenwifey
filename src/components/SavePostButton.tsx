import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { useContext } from "react";
import { PostContext } from "@/pages/admin/BlogPostEditor";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
  title: z.string().min(1, "Please enter a title."),
  slug: z.string(), // make this slug follow the title if no slug is given e.g is title is "My First Post" slug becomes "my-first-post"
  public: z.boolean(),
});

export default function SavePostButton() {
  const { editor } = useCurrentEditor();
  const data = useContext(PostContext);
  const form = useForm({
    defaultValues: {
      title: data?.title || "",
      slug: data?.slug || "",
      public: data?.public || false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.slug.trim() === "") {
        value.slug = value.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      const postData = {
        title: value.title,
        slug: value.slug,
        content: editor?.getMarkdown() || "",
        public: value.public,
        id: data?.id || null,
        created_at: data?.created_at || new Date().toISOString(),
      };

      console.log("Final post data to save:", postData);
    },
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button type="button" data-style="primary">
            Save Post
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to save this post?</DialogTitle>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.Field
                  name="title"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Post Title</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="My First Blog Post!"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="slug"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Post Slug</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="My First Blog Post!"
                          autoComplete="off"
                        />
                        <FieldDescription className="text-start">
                          It's the thing that appears in the URL e.g{" "}
                          mavenwifey.netlify.app/blog/<b>my-first-post</b>. Will
                          be auto-generated based on title if left blank.
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="public"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FieldSet>
                        <FieldGroup data-slot="checkbox-group">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <Checkbox
                              id={field.name}
                              name={field.name}
                              checked={field.state.value}
                              onCheckedChange={(checked) =>
                                field.handleChange(checked === true)
                              }
                            />
                            <FieldLabel
                              htmlFor={field.name}
                              className="font-normal"
                            >
                              Publish to the public
                            </FieldLabel>
                          </Field>
                        </FieldGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </FieldSet>
                    );
                  }}
                />
              </FieldGroup>
              <Button type="submit" className="mt-4">
                Save
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
