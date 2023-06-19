import { useState, useEffect } from 'react';
import { Chip, Autocomplete, TextField, Button } from '@mui/material';
import { supabase } from '../lib/initSupabase';

interface Tag {
    id: number;
    name: string;
}

interface TagsManagerProps {
    contact: any;
}

export const TagsManager: React.FC<TagsManagerProps> = ({ contact }) => {
    const user = supabase.auth.user();
    const [tags, setTags] = useState<Tag[]>([]);
    const [contactTags, setContactTags] = useState<Tag[]>(contact.tags || []);
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        const { data: tagsData, error } = await supabase.from('tags').select();
        if (error) {
            console.error(error);
            return;
        }
        setTags(tagsData || []);
    }

    const handleTagDelete = (tagToDelete: Tag) => async () => {
        const { error } = await supabase
            .from('contact_tag')
            .delete()
            .match({ contact_id: contact.id, tag_id: tagToDelete.id });
        if (error) {
            console.error('Error deleting tag: ', error);
        } else {
            setContactTags((tags) => tags.filter((tag) => tag.id !== tagToDelete.id));
        }
    };

    const handleAddTag = async () => {
        let selectedTag = tags.find(tag => tag.name === tagInput);
        if (!selectedTag) {
            const { data, error } = await supabase.from('tags').insert([{ name: tagInput, user_id: user.id }]);
            if (error) {
                console.error('Error creating new tag: ', error);
                return;
            }
            selectedTag = data[0];
            setTags([...tags, selectedTag]);
        }

        const { error: linkError } = await supabase.from('contact_tag').insert([{ contact_id: contact.id, tag_id: selectedTag.id, user_id: user.id }]);
        if (linkError) {
            console.error('Error linking tag with contact: ', linkError);
            return;
        }

        setContactTags([...contactTags, selectedTag]);
        setTagInput('');
    };

    return (
        <div className="p-1">
            <div className="flex flex-wrap gap-2">
                {contactTags.map((tag) => (
                    <Chip
                        key={tag.id}
                        label={tag.name}
                        onDelete={handleTagDelete(tag)}
                        className="bg-indigo-500 text-white"
                    />
                ))}
            </div>
            <div className="flex gap-2 mt-4 w-full">
                <div className="flex-grow">
                <Autocomplete
                    freeSolo={true}
                    options={tags.map((tag) => tag.name)}
                    inputValue={tagInput}
                    onInputChange={(event, newValue) => {
                        setTagInput(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                            variant="outlined"
                            
                            style={{ minWidth: '250px' }}
                        />
                    )}
                />
                </div>
                <div className='h-max'>
                <Button
                    onClick={handleAddTag}
                    variant="outlined"
                    className="bg-indigo-500 text-white h-full"
                >
                    Add Tag
                </Button>
                </div>
            </div>

        </div>


    );
};
