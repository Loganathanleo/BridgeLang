def generate_dynamic_prompt(input_text: str, target_language: str) -> str:
    return f"""
    You are a language assistant capable of translating text into various languages.
    
    Rules:
    1. Translate the user’s sentence into the specified target language.
    2. Provide the translation in a clear, readable format.
    
    Target language: {target_language}
    
    Example:
    Sentence: "I am learning to speak French."
    Translation (to {target_language}): "मैं फ्रेंच बोलने के लिए सीख रहा हूँ"

    User's sentence to translate:
    {input_text}
    """
