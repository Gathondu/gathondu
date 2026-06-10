from django.contrib import admin
from django.utils.html import format_html

from .models import Asset, Certification, Education, Experience, Profile, SkillGroup, Stat


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ("title", "kind", "file", "asset_url", "updated_at")
    list_filter = ("kind",)
    readonly_fields = ("asset_url", "created_at", "updated_at")
    search_fields = ("title", "file", "kind")

    @admin.display(description="URL")
    def asset_url(self, obj):
        if not obj.file:
            return "-"
        return format_html(
            '<a href="{}" target="_blank" rel="noopener noreferrer">{}</a>',
            obj.file.url,
            obj.file.url,
        )


class StatInline(admin.TabularInline):
    model = Stat
    extra = 1


class SkillGroupInline(admin.TabularInline):
    model = SkillGroup
    extra = 1


class ExperienceInline(admin.StackedInline):
    model = Experience
    extra = 1


class CertificationInline(admin.StackedInline):
    model = Certification
    extra = 1
    autocomplete_fields = ("asset",)


class EducationInline(admin.StackedInline):
    model = Education
    extra = 0
    max_num = 1


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "location", "available", "updated_at")
    autocomplete_fields = ("resume_asset",)
    inlines = [
        StatInline,
        SkillGroupInline,
        ExperienceInline,
        EducationInline,
        CertificationInline,
    ]


admin.site.register(Stat)
admin.site.register(SkillGroup)
admin.site.register(Experience)
admin.site.register(Education)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    autocomplete_fields = ("asset",)
    list_display = ("name", "profile", "asset", "order")
    list_filter = ("profile",)
    search_fields = ("name", "url", "static_asset_path", "asset__title")
