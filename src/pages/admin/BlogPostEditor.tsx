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
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  type SandpackConfig,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { imageUploadHandler, usePost } from "../../utils/blog";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

export default function BlogEditor() {
  let { slug } = useParams();
  const { data, error, isLoading } = usePost(slug);
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    if (data?.content) {
      editorRef.current?.setMarkdown(data.content);
    }
  }, [data]);

  async function onSave() {
    console.log(editorRef.current?.getMarkdown());
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading post...</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-center">Please use light mode to see content</p>
      <div className="flex flex-row items-center gap-2 max-w-4xl mx-auto my-2">
        <Label htmlFor="title">Title: </Label>
        <Input
          type="text"
          placeholder="Title"
          value={data?.title || ""}
          onChange={(e) => {
            // Handle title change
            console.log(e.target.value);
          }}
        />
      </div>
      <MDXEditor
        ref={editorRef}
        markdown=""
        contentEditableClassName="prose max-w-none"
        plugins={[
          headingsPlugin(),
          quotePlugin(),
          listsPlugin(),
          thematicBreakPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: "JavaScript", css: "CSS" },
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex flex-row gap-2 p-2 border-2 w-full">
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      when: (editor) => editor?.editorType === "sandpack",
                      contents: () => <ShowSandpackInfo />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                          <InsertSandpack />
                        </>
                      ),
                    },
                  ]}
                />

                <Button onClick={onSave}>Save</Button>
              </div>
            ),
          }),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin({
            imageUploadHandler,
          }),
          tablePlugin(),
          markdownShortcutPlugin(),
        ]}
      />
    </>
  );
}
