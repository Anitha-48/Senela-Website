from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class ContactApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_contact_endpoint_accepts_valid_payload(self):
        response = self.client.post(
            reverse("contact-create"),
            {
                "name": "Alice",
                "email": "alice@example.com",
                "service": "EPC Contracts",
                "project_details": "Need a quote for a warehouse project.",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["message"], "Contact message received")
