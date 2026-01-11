import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Check } from "lucide-react";
import { useSavePost } from "@/lib/blog";

const formSchema = z.object({
  title: z.string().min(1, "Please enter a title."),
  slug: z.string(), // make this slug follow the title if no slug is given e.g is title is "My First Post" slug becomes "my-first-post"
  public: z.boolean(),
});

export default function SavePostButton() {
  const { editor } = useCurrentEditor();
  const data = useContext(PostContext);
  const mutation = useSavePost();
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
        ...(data?.id && { id: data.id }),
        title: value.title,
        slug: value.slug,
        content: editor?.getMarkdown() || "",
        public: value.public,
      };

      mutation.mutate(postData);

      // console.log("Final post data to save:", postData);
      // const { data: response, error } = await supabase
      //   .from("posts")
      //   .upsert(postData)
      //   .select();
      // if (error) {
      //   console.error("Error saving post:", error);
      //   throw error;
      // } else {
      //   console.log("Post saved successfully:", response);
      // }
    },
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Save Post</Button>
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
                <Field>
                  <form.Subscribe
                    selector={(state) => ({
                      isSubmitting: state.isSubmitting,
                      isSubmitted: state.isSubmitted,
                      submissionAttempts: state.submissionAttempts,
                    })}
                    children={({
                      isSubmitting,
                      isSubmitted,
                      submissionAttempts,
                    }) => (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="transition-all duration-200 min-w-[100px]"
                      >
                        {isSubmitting ? (
                          <Spinner className="h-4 w-4" />
                        ) : isSubmitted && submissionAttempts > 0 ? (
                          <span className="flex items-center gap-2 animate-in fade-in">
                            <Check className="h-4 w-4" />
                            Saved!
                          </span>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    )}
                  />
                </Field>
                <Field>
                  <form.Subscribe
                    selector={(state) => state.errors.length > 0}
                    children={(error) => (
                      <>
                        {error && (
                          <FieldError
                            errors={form.getAllErrors().form.errors}
                          />
                        )}
                      </>
                    )}
                  />
                </Field>
              </FieldGroup>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
