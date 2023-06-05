'use client'
import {useState} from 'react'

// NOTE: https://github.com/facebook/react/issues/3468#issuecomment-1031366038
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string
    webkitdirectory?: string
  }
}

export default function Upload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i])
      formData.append('relativePaths', selectedFiles[i].webkitRelativePath)
    }

    formData.append('remotePath', '/')
    formData.append('contentType', 'application/octet-stream')

    const response = await fetch('http://localhost:8080/upload-all', {
      method: 'POST',
      body: formData,
      credentials: 'include', // Include cookies
    })

    if (response.ok) {
      alert('Files uploaded successfully!')
    } else {
      alert('File upload failed!')
    }
  }

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      setSelectedFiles(files)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="file" webkitdirectory="" onChange={fileChangeHandler} />
      <button type="submit">Upload</button>
    </form>
  )
}
