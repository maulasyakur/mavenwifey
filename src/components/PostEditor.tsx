import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HeadingDropdownMenu from "./tiptap-ui/heading-dropdown-menu/heading-dropdown-menu";
import { MarkButton } from "./tiptap-ui/mark-button";
import { Separator } from "./tiptap-ui-primitive/separator";
import { ListDropdownMenu } from "./tiptap-ui/list-dropdown-menu";
import { Markdown } from "@tiptap/markdown";
import { ImageUploadButton } from "./tiptap-ui/image-upload-button";
import { Image } from "@tiptap/extension-image";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { toast } from "sonner";
import Link from "@tiptap/extension-link";
import { LinkPopover } from "./tiptap-ui/link-popover";
import { Youtube as YoutubeExtension } from "@tiptap/extension-youtube";
import SavePostButton from "./SavePostButton";
import { UndoRedoButton } from "./tiptap-ui/undo-redo-button";

const extensions = [
  TextStyleKit,
  StarterKit,
  Markdown,
  Image,
  ImageUploadNode.configure({
    accept: "image/*",
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error) => toast(`Upload failed: ${error.message}`),
  }),
  Link.configure({ openOnClick: false }),
  YoutubeExtension,
];

function MenuBar() {
  return (
    <div className="fixed bottom-0 sm:sticky sm:top-0 w-full bg-background z-50">
      <div className="relative">
        {/* Left gradient overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-x-auto space-x-1 p-2 items-center justify-center border-t-2 sm:border-b-2 sm:border-t-0">
          <UndoRedoButton action={"undo"} />
          <UndoRedoButton action={"redo"} />
          <Separator orientation="vertical" />
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="underline" />
          <LinkPopover hideWhenUnavailable={true} autoOpenOnLinkActive={true} />
          <Separator orientation="vertical" />
          <HeadingDropdownMenu
            levels={[1, 2, 3, 4, 5, 6]}
            hideWhenUnavailable={true}
            portal={false}
          />
          <ListDropdownMenu
            types={["bulletList", "orderedList", "taskList"]}
            hideWhenUnavailable={true}
            portal={false}
          />
          <Separator orientation="vertical" />
          <ImageUploadButton
            hideWhenUnavailable={true}
            onInserted={() => console.log("Image inserted!")}
          />
          <SavePostButton />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}

export default function TextEditor({ content }: { content: string }) {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-5 focus:outline-none mx-auto mb-16 sm:mb-0",
      },
    },
    content: content,
    contentType: "markdown",
  });
  return (
    <EditorContext.Provider value={{ editor }}>
      <MenuBar />
      <EditorContent editor={editor} />
    </EditorContext.Provider>
  );
}
