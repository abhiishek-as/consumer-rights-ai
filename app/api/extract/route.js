export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const extractedText = new TextDecoder().decode(uint8Array);

    return Response.json({ success: true, text: extractedText.trim() });

  } catch (error) {
    console.error('Extract error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}