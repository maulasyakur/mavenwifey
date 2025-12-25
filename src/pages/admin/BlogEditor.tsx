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
  Button,
  type MDXEditorMethods,
  markdownShortcutPlugin,
  quotePlugin,
  headingsPlugin,
} from "@mdxeditor/editor";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { imageUploadHandler, usePost } from "../../utils/blog";

export default function BlogEditor() {
  let { slug } = useParams();
  const { data, error, isLoading } = usePost(slug);
  const editorRef = useRef<MDXEditorMethods>(null);

  // useEffect(() => {
  //   const tailwindLink = document.querySelector(
  //     'link[href="/src/index.css"]'
  //   ) as HTMLLinkElement;

  //   if (tailwindLink) {
  //     tailwindLink.disabled = true;
  //   }

  //   return () => {
  //     if (tailwindLink) {
  //       tailwindLink.disabled = false;
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (data?.content) {
      editorRef.current?.setMarkdown(data.content);
    }
  }, [data]);

  async function onSave() {
    console.log(editorRef.current?.getMarkdown());
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post...</div>;
  }

  return (
    <>
      <MDXEditor
        ref={editorRef}
        markdown=""
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <Button onClick={onSave}>Save</Button>
              </>
            ),
          }),
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin({
            imageUploadHandler,
          }),
          tablePlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
        ]}
      />
    </>
  );
}
