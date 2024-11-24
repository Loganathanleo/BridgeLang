from fastapi import HTTPException
from prompt import generate_dynamic_prompt
from model import get_translation

async def bridgelang(input_text: str, target_language: str):
    """
    Controller function to handle the logic for /bridgelang endpoint.
    
    - Validates input_text.
    - Validates target_language.
    - Prepares the system prompt using `generate_dynamic_prompt`.
    - Sends the prompt to the model and retrieves the translation.
    - Returns the translated sentence or raises appropriate exceptions.
    """
    # Input validation
    if not input_text.strip():
        raise HTTPException(status_code=400, detail="Input cannot be empty")
    
    if not target_language:
        raise HTTPException(status_code=400, detail="Target language is required")

    # Prepare the system prompt based on the user input and target language
    prompt = generate_dynamic_prompt(input_text, target_language)

    try:
        # Call the model to get the translation
        translated_text = await get_translation(prompt)
    except Exception as e:
        # Handle any model-related errors
        raise HTTPException(status_code=500, detail=f"Error from model: {str(e)}")
    
    # Return the translated sentence
    return {"translated_sentence": translated_text, "status": "success"}
