import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
    DecoupledEditor,
    AccessibilityHelp,
    Alignment,
    Autoformat,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    Bold,
    Code,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    Highlight,
    HorizontalLine,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    RemoveFormat,
    SelectAll,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Underline,
    Undo
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ar.js';

import 'ckeditor5/ckeditor5.css';

import './text.css';

export default function Text({ setText, defaultData }) {
    const editorContainerRef = useRef(null);
    const editorMenuBarRef = useRef(null);
    const editorToolbarRef = useRef(null);

    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);


    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);


    // on Destroy
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        return () => {
            if (editorInstance) {
                editorInstance.destroy();
            }
        };
    }, []);

    const safeClearChildren = (ref) => {
        if (ref?.current?.children) {
            Array.from(ref.current.children).forEach((child) => {
                if (child?.remove) child.remove();
            });
        }
    };

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'fontSize',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'link',
                'insertTable',
                'highlight',
                'blockQuote',
                '|',
                'alignment',
                '|',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            Alignment,
            Autoformat,
            AutoLink,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            Bold,
            Code,
            Essentials,
            FindAndReplace,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            Heading,
            Highlight,
            HorizontalLine,
            Indent,
            IndentBlock,
            Italic,
            Link,
            Paragraph,
            RemoveFormat,
            SelectAll,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Strikethrough,
            Subscript,
            Superscript,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            Underline,
            Undo
        ],
        balloonToolbar: ['bold', 'italic', '|', 'link'],
        fontFamily: {
            supportAllValues: true
        },
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true
        },
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        // initialData: defaultData || '...',
        language: 'ar',
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        menuBar: {
            isVisible: true
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        translations: [translations]
    };

    return (
        <div style={{ width: '100%' }} >
            <div className="main-container">
                <div className="editor-container editor-container_document-editor" ref={editorContainerRef}>
                    <div className="editor-container__menu-bar" ref={editorMenuBarRef}></div>
                    <div className="editor-container__toolbar" ref={editorToolbarRef}></div>
                    <div className="editor-container__editor-wrapper">
                        <div className="editor-container__editor">
                            <div ref={editorRef} style={{ color: "#000" }}>
                                {isLayoutReady && (
                                    <CKEditor
                                        onInstanceReady={(event) => {
                                            setEditorInstance(event.editor);
                                        }}
                                        onChange={(e, editor) => setText(editor.getData())}
                                        // onReady={editor => {

                                        //     editorToolbarRef.current.appendChild(editor.ui.view.toolbar.element);
                                        //     editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element);

                                        // }}
                                        // onAfterDestroy={() => {
                                        //     Array.from(editorToolbarRef.current.children).forEach(child => child.remove());
                                        //     Array.from(editorMenuBarRef.current.children).forEach(child => child.remove());
                                        // }}

                                        onReady={(editor) => {
                                            if (editorToolbarRef.current) {
                                                editorToolbarRef.current.appendChild(editor.ui.view.toolbar.element);
                                            }
                                            if (editorMenuBarRef.current) {
                                                editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element);
                                            }
                                            setEditorInstance(editor);
                                        }}
                                        onAfterDestroy={() => {
                                            safeClearChildren(editorToolbarRef);
                                            safeClearChildren(editorMenuBarRef);
                                        }}

                                        data={defaultData}
                                        editor={DecoupledEditor}
                                        config={editorConfig}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
