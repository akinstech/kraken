function _getLongestLine(s) {
  let longest = '';
  s.split('\n').forEach(l => {
    if (l.length > longest.length) {
      longest = l;
    }
  });
  return longest.length;
}

export function centerText(s) {
  const consoleWidth = process.stdout.columns;

  let multiLine = false
  let textWidth = null;
  if (s.includes('\n')) {
    multiLine = true;
    textWidth = _getLongestLine(s);
  } else {
    textWidth = s.length;
  }

  const indent = textWidth + Math.round((consoleWidth - textWidth) / 2);

  let centeredText = '';
  if (multiLine) {
    const lines = s.split('\n');
    for (const line of lines) {
      if (line) {
        centeredText += line.padStart(indent, ' ') + '\n';
      }
    }
  } else {
    centeredText = s.padStart(indent, ' ');
  }
  return centeredText;
}

export function dummy() {
  return null;
}
