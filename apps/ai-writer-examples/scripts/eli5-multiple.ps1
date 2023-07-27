#!/usr/bin/env pwsh

$topics = "elephant", "giraffe", "lion", "tiger", "zebra"
for ($i=0; $i -lt $topics.length; $i++) {
    $topic = $topics[$i]
    npx ai-writer eli5 --topic $topic --output "eli5/$topic" --verbose
}