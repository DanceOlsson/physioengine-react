from flask import current_app
from app.questionnaires_config import QUESTIONNAIRES

def calculate_koos_scores(responses):
    try:
        config = QUESTIONNAIRES['koos']
        current_app.logger.info(f"KOOS config: {config}")
        subscale_scores = {}

        for section, questions in config['sections'].items():
            current_app.logger.info(f"Calculating score for section: {section}")
            valid_responses = [responses.get(q, 0) for q in questions if q in responses]
            current_app.logger.info(f"Valid responses for {section}: {valid_responses}")
            if valid_responses:
                subscale_scores[section] = 100 - (sum(valid_responses) * 100 / (4 * len(valid_responses)))

        current_app.logger.info(f"Subscale scores: {subscale_scores}")

        if not subscale_scores:
            current_app.logger.warning("No valid subscale scores calculated")
            return {
                'questionnaire_name': config['name'],
                'sections': [],
                'total_score': 0,
                'interpretation': 'No valid responses received'
            }

        total_score = sum(subscale_scores.values()) / len(subscale_scores)
        
        interpretation = next((desc for range, desc in config['interpretation'].items() if range[0] <= total_score <= range[1]), 'Unable to interpret')

        result = {
            'questionnaire_name': config['name'],
            'sections': [
                {'name': section, 'score': score, 'interpretation': get_interpretation(score)}
                for section, score in subscale_scores.items()
            ],
            'total_score': total_score,
            'interpretation': interpretation
        }
        current_app.logger.info(f"Final result: {result}")
        return result
    except Exception as e:
        current_app.logger.error(f"Error in calculate_koos_scores: {str(e)}", exc_info=True)
        return None

def get_interpretation(score):
    config = QUESTIONNAIRES['koos']
    return next((desc for range, desc in config['interpretation'].items() if range[0] <= score <= range[1]), 'Unable to interpret')
