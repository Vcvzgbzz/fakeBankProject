import Button from '../controls/Button'

function objectMapper(object) {
  return object !== null && object !== undefined
    ? Object.entries(object)
        .map((objectItem) => {
          return `<li>${objectItem[0]}: ${
            typeof objectItem[1] === 'object' && object[1] !== null
              ? `<ul>${objectMapper(objectItem[1])}</ul>`
              : objectItem[1]
          }</li>`
        })
        .join('')
    : '<li>null</li>'
}

export default function JsonViewer({ object, setViewJsonData, viewJsonData }) {
  return (
    <div>
      <Button onClick={() => setViewJsonData(!viewJsonData)}> Go Back </Button>
      <ul dangerouslySetInnerHTML={{ __html: objectMapper(object) }} />
    </div>
  )
}
