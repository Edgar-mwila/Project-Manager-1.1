import * as React from 'react';
import { useState, useEffect } from 'react';
import { UserRole } from '../../interfaces/ProjectManager-interfaces.ts';

const DocumentList = ({ projectId, userRole }: any) => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    // Fetch documents for the project
    // This is a placeholder and should be replaced with actual API call
    setDocuments([
      { id: 1, name: 'Project Proposal', type: 'pdf' },
      { id: 2, name: 'Requirements Doc', type: 'docx' },
      { id: 3, name: 'Design Mockups', type: 'zip' },
    ]);
  }, [projectId]);

  const handleUpload = () => {
    // Implement document upload logic
    console.log('Upload document');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Documents</h3>
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.id} className="flex items-center justify-between">
            <span>{doc.name}</span>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Download
            </button>
          </li>
        ))}
      </ul>
      {userRole !== UserRole.Viewer && (
        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Document
        </button>
      )}
    </div>
  );
};

export default DocumentList;