"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Save, X } from "lucide-react"

interface EditableSectionProps {
  title: string
  content: string
  onSave: (newContent: string) => void
}

export function EditableSection({ title, content, onSave }: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedContent(content)
  }

  const handleSave = () => {
    onSave(editedContent)
    setIsEditing(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
      )}
    </div>
  )
}

