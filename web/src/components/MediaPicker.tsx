'use client'

import { ChangeEvent, useState } from "react"

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return

    const previewURL = URL.createObjectURL(files[0]);

    setPreview(previewURL);
  }

  return (
    <>
      <input onChange={onFileSelected} type="file" id="media" name="coverUrl" accept="image/*" className="invisible w-0 h-0" />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="preview" className="w-full aspect-video rounded-lg object-cover" />)}
    </>
  )
}