"""
Base classes for Errors in Clueless
"""

class CluelessError(Exception):
    """
    Base Error class
    """

class ApiError(CluelessError):
    """
    API Error, for invalid deserialization of messages from the API.
    """
    def __init__(self, message):
        CluelessError.__init__(self)
        self.message = message
