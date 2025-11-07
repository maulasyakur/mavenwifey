import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CreateLink,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  tablePlugin,
  ListsToggle,
  listsPlugin,
} from "@mdxeditor/editor";
import supabase from "../../utils/supabase";

export default function BlogUpload() {
  async function imageUploadHandler(image: File) {
    image.arrayBuffer();
    const formData = new FormData();
    formData.append("image", image);
    const bucket = "posts";
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const { data: UploadData, error: UploadError } = await supabase.storage
      .from(bucket)
      .upload(image.name, formData, {
        cacheControl: "3600",
        upsert: true,
      });
    if (UploadError) throw UploadError;

    const { data: URLdata } = supabase.storage
      .from(bucket)
      .getPublicUrl(UploadData.path);

    return URLdata.publicUrl;
  }

  return (
    <MDXEditor
      className="border"
      markdown="Hello world"
      plugins={[
        toolbarPlugin({
          toolbarClassName: "my-classname",
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <CreateLink />
              <InsertImage />
              <InsertTable />
            </>
          ),
        }),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          imageUploadHandler,
        }),
        tablePlugin(),
        listsPlugin(),
      ]}
    />
  );
}
