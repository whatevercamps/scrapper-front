import React, { Component } from 'react'
import {COUNTRIES} from './countries';
import './aver.css'
import { WithContext as ReactTags } from 'react-tag-input';
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const suggestions = COUNTRIES.map((country) => {
    return {
      id: country,
      text: country
    }
  })
  
export default class TagInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [{ id: 'Thailand', text: 'Thailand' }, { id: 'India', text: 'India' }],
            suggestions: suggestions,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    handleTagClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    handleTagClick={this.handleTagClick}
                />
            </div>
        );
    }
}
