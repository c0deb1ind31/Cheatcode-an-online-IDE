# populate_data.py

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from problems.models import Problems
from users.models import Users

def populate_data():
    # Create instances of YourModel and save them to the database
    try:
        user = Users(id="275f80ef-826e-48aa-a1de-824d937f7454",username="TestUser",email="TestUser@gmail.com",reputation=1)
        user.save()
        problem= Problems(title='Palindrome Number',description="Given an integer `x`, return `true` if x is a palindrome, and `false` otherwise.\n## Example 1:\n\n\nInput: x = 121\n\nOutput: true\n\nExplanation: 121 reads as 121 from left to right and from right to\n\n\n## Example 2:\nInput: x = -121\n\nOutput: false\n\nExplanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.\n\n\n## Example 3:\nInput: x = 10\n\nOutput: false\n\nExplanation: Reads 01 from right to left. Therefore it is not a palindrome.\n\n\n## Constraints:\n* -2^31 <= x <= 2^31 - 1", test_input="121",test_output="True",difficulty="easy",user=user)
        problem.save()
    except Exception as e:
        print("Database Already populated")
    # Add more instances as needed

if __name__ == '__main__':
    populate_data()
