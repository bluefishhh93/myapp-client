import { Node, mergeAttributes } from '@tiptap/core';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import Youtube from '@tiptap/extension-youtube';

export const CustomYoutube = Youtube.extend({
  parseHTML() {
    return [
      {
        tag: 'div[data-youtube-video]',
        getAttrs: (dom) => ({
          src: dom.getAttribute('data-youtube-video'),
        }),
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-youtube-video': HTMLAttributes.src }, 0]
  },
  addNodeView() {
    return ({ node, HTMLAttributes, getPos }) => {
      const container = document.createElement('div');
      container.setAttribute('data-youtube-video', node.attrs.src);
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', node.attrs.src);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'true');
      container.appendChild(iframe);
      return { dom: container };
    };
  },
});