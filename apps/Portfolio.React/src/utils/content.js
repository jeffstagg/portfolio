// ─── Frontmatter parser ───────────────────────────────────────────────────────
// Handles the subset of YAML used in content files:
//   - scalar strings:  key: value
//   - list values:     key:\n  - item\n  - item

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };

  const content = match[2].trim();
  const data    = {};
  const lines   = match[1].split(/\r?\n/);

  let i = 0;
  while (i < lines.length) {
    const kv = lines[i].match(/^([\w-]+)\s*:\s*(.*)$/);
    if (kv) {
      const key = kv[1];
      const val = kv[2].trim();

      if (val === "") {
        // Collect indented list items on following lines
        const items = [];
        i++;
        while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s+-\s+/, "").trim());
          i++;
        }
        data[key] = items;
        continue;
      } else {
        data[key] = val;
      }
    }
    i++;
  }

  return { data, content };
}

// ─── Public API ───────────────────────────────────────────────────────────────

const BASE = "/content";

export async function getExperiences() {
  const index = await fetch(`${BASE}/index.json`).then(r => r.json());

  const [expTexts, projTexts] = await Promise.all([
    Promise.all(index.experiences.map(slug =>
      fetch(`${BASE}/experiences/${slug}.md`).then(r => r.text())
    )),
    Promise.all(index.projects.map(slug =>
      fetch(`${BASE}/projects/${slug}.md`).then(r => r.text())
    )),
  ]);

  // Build experience objects in index order
  const experiences = expTexts.map(raw => {
    const { data } = parseFrontmatter(raw);
    return {
      id:             data.id,
      title:          data.title          || "",
      company:        data.company        || "",
      period:         data.period         || "",
      employmentType: data.employmentType || "",
      location:       data.location       || "",
      highlights:     Array.isArray(data.highlights) ? data.highlights : [],
      projects:       [],
    };
  });

  // Build project objects and attach to parent experience
  projTexts.forEach(raw => {
    const { data, content } = parseFrontmatter(raw);
    const exp = experiences.find(e => e.id === data.experience);
    if (!exp) return;

    exp.projects.push({
      id:           data.id,
      title:        data.title    || "",
      company:      data.company  || "",
      timeline:     data.timeline || "",
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      content,
    });
  });

  return experiences;
}
