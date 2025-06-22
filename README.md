# astromdblog
Blog template for Astro using Markdown rendering.

Create your own blog with Astro and Markdown.

# How it works

In `pages/blog.astro`, blog entries are listed by calling the `BlogNews` component, which contains a list of entries in JavaScript.  
The way to list them is as follows:
<pre>// News Section
const newsData = [
    {
        id: 1,
        title: 'Blog new',
        summary: 'summary',
        date: '17-6-25',
        category: 'tech',
        image: 'path-to-your-img.png',
        slug: 'blog-new'
    }
];</pre>

As you add entries, you must update this list.

The posts are stored in `pages/blog/`, which is the page that calls the Markdown renderer `MarkdownRender` to render the Markdown document located in `public/blog`.

The structure of the blog page (in this case `undefined.astro`) is as follows:
<pre>
// Convert Markdown to HTML
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n$/gim, '<br />')
    // Paragraphs
    .replace(/\n\n/gim, '</p><p>')
    .replace(/^(.*)$/gim, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/gim, '')
    .replace(/<p><h/gim, '<h')
    .replace(/<\/h([1-6])><\/p>/gim, '</h$1>');
}

// Read markdown file
const markdownPath = path.join(process.cwd(), 'public', 'blog', 'undefined.md');
let markdownContent = '';

try {
  markdownContent = fs.readFileSync(markdownPath, 'utf-8');
} catch (error) {
  console.error('Error reading markdown file:', error);
  markdownContent = '# Error\n\nCould not load content.';
}

const htmlContent = markdownToHtml(markdownContent);
</pre>

Where `const markdownPath = path.join(process.cwd(), 'public', 'blog', 'undefined.md');` is the constant that points to the Markdown document.

# Formatting to Markdown
To format in Markdown, you can use the first visual Markdown editor on GitHub [InMD](https://inmd.inled.es) or write in [MDPDF](https://mdpdf.inled.es) and previsualize the result.
