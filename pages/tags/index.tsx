import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/initSupabase';
import Page from '../../components/Page';
import { Auth } from '@supabase/ui';

interface Tag {
  id: string;
  name: string;
}

const TagsPage: React.FC = () => {

  const { user } = Auth.useUser();
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const { data: tagsData, error } = await supabase.from('tags').select('*');
    if (error) {
      console.error(error);
      return;
    }
    setTags(tagsData || []);
  }

  const updateTag = async () => {
    const { data, error } = await supabase
      .from('tags')
      .update({ name: newTagName })
      .eq('id', editingTagId)

    if (error) {
      console.error(error);
      return;
    }

    setTags(tags.map(tag => tag.id === editingTagId ? data[0] : tag));
    setEditingTagId(null);
    setNewTagName('');
  }

  const deleteTag = async (id: string) => {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error);
      return;
    }

    setTags(tags.filter(tag => tag.id !== id));
  }

  const createTag = async () => {
    const { data: tag, error } = await supabase
      .from('tags')
      .insert({ name: newTag, user_id: user.id })

    if (error) {
      console.error(error);
      return;
    }

    setTags([...tags, tag[0]]);
    setNewTag('');
  }

  return (
    <Page>
      <div className="m-8">
        <h1 className="text-3xl font-bold mb-4">Tags</h1>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-200 p-3 my-2 rounded-md">
            {editingTagId === tag?.id ? (
              <span>
              <input 
                value={newTagName} 
                onChange={e => setNewTagName(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              </span>
            ) : (
              <span className="text-lg font-semibold">{tag?.name}</span>
            )}
            <div>
              {editingTagId === tag?.id ? (
                <button 
                  onClick={updateTag}
                  className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-6 mr-10 rounded-md">
                  Update
                </button>
              ) : (
                <button 
                  onClick={() => { setEditingTagId(tag?.id); setNewTagName(tag.name); }}
                  className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-6 mr-10 rounded-md">
                  Edit
                </button>
              )}
              <button 
                onClick={() => deleteTag(tag?.id)}
                className="text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Create a new tag</h2>
          <input 
            value={newTag} 
            onChange={e => setNewTag(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            placeholder="Enter tag name"
          />
          <button 
            onClick={createTag}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Create tag
          </button>
        </div>
      </div>
    </Page>
  );
};

export default TagsPage;
