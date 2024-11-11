from django.contrib import admin
from .models import *
from django.contrib.sessions.models import Session

admin.site.register(User)

class SessionAdmin(admin.ModelAdmin):
    def user(self, obj):
        session_user = obj.get_decoded().get('_auth_user_id')
        user = User.objects.get(id=session_user)
        return user.email
    def _session_data(self, obj):
        return obj.get_decoded()
    _session_data.allow_tags = True
    list_display = ['user', 'session_key', '_session_data', 'expire_date']
    readonly_fields = ['_session_data']
admin.site.register(Session, SessionAdmin)