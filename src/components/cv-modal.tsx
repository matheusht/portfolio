"use client"

import { useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { ExternalLink } from "lucide-react"

interface CVModalProps {
  cvUrl: string
  cvFilename: string
}

export default function CVModal({ cvUrl, cvFilename }: CVModalProps) {
  const [open, setOpen] = useState(false)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = cvUrl
    link.download = cvFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const pdfViewerUrl = `${cvUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-3 bg-[#64FFDA] text-[#0A192F] rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2">
          <span>Review My CV</span>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0 bg-[#112240] border border-[#64FFDA]/30 text-white">
        <DialogHeader className="p-4 border-b border-[#64FFDA]/20 flex flex-row items-center justify-between">
          <DialogTitle className="text-[#64FFDA]">My Curriculum Vitae</DialogTitle>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownload} className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/80">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-[#64FFDA]/10 hover:text-white p-2 h-8 w-8"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <iframe src={pdfViewerUrl} className="w-full h-[80vh]" title="CV Preview" frameBorder="0"></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}

