'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Editor } from '@tinymce/tinymce-react'
import {
  Save,
  FileText,
  Eye,
  Download,
  Maximize2,
  Minimize2,
  Settings,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export default function EditorPage() {
  const editorRef = useRef<any>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [documentTitle, setDocumentTitle] = useState('Untitled Document')
  const [content, setContent] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const handleEditorChange = (newContent: string) => {
    setContent(newContent)

    // Count words
    const textContent = newContent.replace(/<[^>]*>/g, '').trim()
    const words = textContent ? textContent.split(/\s+/).length : 0
    setWordCount(words)

    // Auto save after 30 seconds of inactivity
    clearTimeout((window as any).autoSaveTimeout)
    ;(window as any).autoSaveTimeout = setTimeout(() => {
      handleAutoSave(newContent)
    }, 30000)
  }

  const handleSave = () => {
    // Simulate save to backend
    console.log('Saving document:', { title: documentTitle, content })
    setLastSaved(new Date())
    toast.success('Document saved successfully!')
  }

  const handleAutoSave = (currentContent: string) => {
    // Simulate auto-save
    console.log('Auto-saving document:', {
      title: documentTitle,
      content: currentContent,
    })
    setLastSaved(new Date())
    toast.info('Document auto-saved')
  }

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${documentTitle}.html`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Document exported!')
  }

  const handlePreview = () => {
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${documentTitle} - Preview</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 40px 20px;
                line-height: 1.6;
                color: #374151;
                background-color: #ffffff;
              }
              h1, h2, h3, h4, h5, h6 { 
                color: #111827; 
                font-weight: 600;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
              }
              p { margin-bottom: 1em; }
              blockquote {
                border-left: 4px solid #e5e7eb;
                margin: 1.5em 0;
                padding-left: 1em;
                color: #6b7280;
                font-style: italic;
              }
              code {
                background-color: #f3f4f6;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                font-size: 0.9em;
              }
              pre {
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                padding: 16px;
                overflow-x: auto;
              }
              img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 1em 0;
              }
              table th, table td {
                border: 1px solid #e5e7eb;
                padding: 8px 12px;
                text-align: left;
              }
              table th {
                background-color: #f9fafb;
                font-weight: 600;
              }
            </style>
          </head>
          <body>
            <h1>${documentTitle}</h1>
            ${content}
          </body>
        </html>
      `)
      newWindow.document.close()
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      className={`${isFullscreen ? 'bg-background fixed inset-0 z-50' : 'container py-6'}`}
    >
      <div
        className={`${isFullscreen ? 'flex h-full flex-col' : 'mx-auto max-w-6xl'}`}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="text-primary h-6 w-6" />
                <h1 className="text-2xl font-bold">Rich Text Editor</h1>
              </div>
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                {wordCount} words
              </span>
              {lastSaved && (
                <span className="inline-flex items-center rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="flex items-center gap-2"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    Exit Fullscreen
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    Fullscreen
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreview}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Document Title */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Document Title
              </label>
              <input
                id="title"
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter document title..."
              />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="mb-6 border-b border-gray-200"></div>

        {/* Editor */}
        <div className={`${isFullscreen ? 'flex-1' : ''}`}>
          <Card
            className={`${isFullscreen ? 'h-full border-0 shadow-none' : ''}`}
          >
            <CardContent className={`${isFullscreen ? 'h-full p-4' : 'p-6'}`}>
              <Editor
                apiKey="mdw8t0d7iws0ttjj440lh9ew605iy7oybwojhs577cjsnqb7" // Thay bằng API key thật hoặc bỏ để dùng domain localhost
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>Start writing your document...</p>"
                value={content}
                onEditorChange={handleEditorChange}
                init={{
                  height: isFullscreen ? '100%' : 600,
                  menubar: 'file edit view insert format tools table help',
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'help',
                    'wordcount',
                    'autosave',
                    'emoticons',
                    'template',
                    'codesample',
                    'hr',
                    'pagebreak',
                    'nonbreaking',
                  ],
                  toolbar: [
                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor',
                    'link image media table | align lineheight | numlist bullist indent outdent',
                    'emoticons charmap codesample | insertdatetime hr pagebreak | removeformat | help',
                  ],
                  content_style: `
                    body { 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                      font-size: 14px;
                      line-height: 1.6;
                      color: #374151;
                      padding: 20px;
                      background-color: #ffffff;
                    }
                    h1, h2, h3, h4, h5, h6 { 
                      color: #111827; 
                      font-weight: 600;
                      margin-top: 1.5em;
                      margin-bottom: 0.5em;
                    }
                    h1 { font-size: 2em; }
                    h2 { font-size: 1.5em; }
                    h3 { font-size: 1.25em; }
                    p { margin-bottom: 1em; }
                    blockquote {
                      border-left: 4px solid #3b82f6;
                      margin: 1.5em 0;
                      padding-left: 1em;
                      color: #6b7280;
                      font-style: italic;
                      background-color: #f8fafc;
                    }
                    code {
                      background-color: #f3f4f6;
                      padding: 2px 6px;
                      border-radius: 4px;
                      font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                      font-size: 0.9em;
                      color: #dc2626;
                    }
                    pre {
                      background-color: #1f2937;
                      color: #f9fafb;
                      padding: 16px;
                      border-radius: 8px;
                      overflow-x: auto;
                    }
                    pre code {
                      background: none;
                      color: inherit;
                      padding: 0;
                    }
                    img {
                      max-width: 100%;
                      height: auto;
                      border-radius: 8px;
                      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    }
                    table {
                      border-collapse: collapse;
                      width: 100%;
                      margin: 1em 0;
                    }
                    table th, table td {
                      border: 1px solid #e5e7eb;
                      padding: 8px 12px;
                      text-align: left;
                    }
                    table th {
                      background-color: #f9fafb;
                      font-weight: 600;
                    }
                    hr {
                      border: none;
                      border-top: 2px solid #e5e7eb;
                      margin: 2em 0;
                    }
                  `,
                  skin: 'oxide',
                  content_css: 'default',
                  branding: false,
                  resize: false,
                  elementpath: false,
                  statusbar: true,
                  paste_data_images: true,
                  automatic_uploads: true,
                  file_picker_types: 'image',
                  file_picker_callback: function (cb: any) {
                    const input = document.createElement('input')
                    input.setAttribute('type', 'file')
                    input.setAttribute('accept', 'image/*')

                    input.addEventListener('change', (e: any) => {
                      const file = e.target.files[0]
                      const reader = new FileReader()

                      reader.addEventListener('load', () => {
                        cb(reader.result as string, { title: file.name })
                      })

                      reader.readAsDataURL(file)
                    })

                    input.click()
                  },
                  setup: (editor: any) => {
                    editor.on('init', () => {
                      console.log('TinyMCE editor initialized')
                    })
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        {!isFullscreen && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>Ready to write</span>
                <span>•</span>
                <span>Auto-save enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Rich text editor powered by TinyMCE</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
