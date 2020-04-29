const { mkdir, write, load } = require('./fileManager.js');
const { addSketch, removeSketch } = require('./schemaManager.js');
const path = require('path');

const templates = [
  path.join(__dirname, 'templates/index.html'),
  path.join(__dirname, 'templates/sketch.js'),
];

const generateSlug = (name) => (
  name.replace(/\s+/g, '_').toLowerCase()
);

const manager = {
  createSketch: async (name) => {
    const slug = generateSlug(name);
    const sketchPath = `public/sketches/${slug}`;

    const loadedTemplates = await Promise.all(
      templates.map(async (template) => {
        const data = await load(template);
        return [path.basename(template), data]
      })
    );

    mkdir(sketchPath)
      .then(files => (
        Promise.all(loadedTemplates.map(([fileName, content]) => (
          write(path.resolve(sketchPath, fileName), content)
        )))
      ))
      .then(() => (
        addSketch(name, slug)
      ))
      .then(console.log('Finished'))
      .catch(err => {
        console.log(err);
      });
  },

  deleteSketch: (name) => {
    const slug = generateSlug(name);
    removeSketch(slug)
      .then(console.log('Done'));
  },
};

module.exports = manager;
