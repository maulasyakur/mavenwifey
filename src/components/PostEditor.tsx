import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HeadingDropdownMenu from "./tiptap-ui/heading-dropdown-menu/heading-dropdown-menu";
import { MarkButton } from "./tiptap-ui/mark-button";
import { Separator } from "./tiptap-ui-primitive/separator";
import { ListDropdownMenu } from "./tiptap-ui/list-dropdown-menu";

const extensions = [TextStyleKit, StarterKit];

function MenuBar() {
  return (
    <div className="sticky top-0 bg-background z-50">
      <div className="relative">
        {/* Left gradient overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-x-auto py-2 space-x-1 px-2 items-center justify-center border-b-2">
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="code" />
          <MarkButton type="underline" />
          <MarkButton type="superscript" />
          <MarkButton type="subscript" />
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
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}

export default function TextEditor() {
  const editor = useEditor({
    extensions,
    content: `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`,
  });
  return (
    <EditorContext.Provider value={{ editor }}>
      <MenuBar />
      <EditorContent
        editor={editor}
        className="prose dark:prose-invert px-4 mx-auto mt-4"
      />
    </EditorContext.Provider>
  );
}
