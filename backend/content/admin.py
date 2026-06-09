from django.contrib import admin

from .models import Certification, Education, Experience, Profile, SkillGroup, Stat


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


class EducationInline(admin.StackedInline):
    model = Education
    extra = 0
    max_num = 1


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "location", "available", "updated_at")
    inlines = [StatInline, SkillGroupInline, ExperienceInline, EducationInline, CertificationInline]


admin.site.register(Stat)
admin.site.register(SkillGroup)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Certification)
