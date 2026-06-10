from django.contrib.staticfiles.storage import staticfiles_storage
from rest_framework import serializers

from .models import Certification, Education, Experience, Profile, Project, SkillGroup, Stat


def absolute_url(context, url):
    request = context.get("request")
    return request.build_absolute_uri(url) if request else url


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ["value", "label"]


class SkillGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillGroup
        fields = ["label", "skills"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["role", "company", "location", "period", "bullets"]


class ProjectSerializer(serializers.ModelSerializer):
    stack = serializers.JSONField(source="tools")
    projectUrl = serializers.URLField(source="project_url", allow_blank=True)
    sourceUrl = serializers.URLField(source="source_url", allow_blank=True)

    class Meta:
        model = Project
        fields = [
            "title",
            "client",
            "status",
            "problem",
            "role",
            "outcome",
            "description",
            "tools",
            "stack",
            "architecture",
            "projectUrl",
            "sourceUrl",
        ]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["degree", "institution", "year", "honors"]


class CertificationSerializer(serializers.ModelSerializer):
    asset = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = ["name", "url", "asset"]

    def get_asset(self, obj):
        if obj.asset and obj.asset.file:
            return absolute_url(self.context, obj.asset.file.url)
        if not obj.static_asset_path:
            return ""
        url = staticfiles_storage.url(obj.static_asset_path)
        return absolute_url(self.context, url)


class ProfileSerializer(serializers.ModelSerializer):
    stats = StatSerializer(many=True)
    skillGroups = SkillGroupSerializer(source="skill_groups", many=True)
    trustItems = serializers.JSONField(source="trust_items")
    serviceItems = serializers.JSONField(source="service_items")
    featuredProjects = serializers.SerializerMethodField()
    resumeUrl = serializers.SerializerMethodField()
    experience = ExperienceSerializer(many=True)
    education = EducationSerializer()
    certifications = CertificationSerializer(many=True)

    class Meta:
        model = Profile
        fields = [
            "name",
            "initials",
            "role",
            "location",
            "email",
            "github",
            "linkedin",
            "available",
            "headline",
            "bio",
            "seo_title",
            "seo_description",
            "open_graph_title",
            "open_graph_description",
            "nav_links",
            "ui_copy",
            "trustItems",
            "serviceItems",
            "featuredProjects",
            "resumeUrl",
            "skill_heading",
            "skill_copy",
            "about_heading",
            "about_copy",
            "contact_heading",
            "contact_copy",
            "contact_note",
            "stats",
            "skillGroups",
            "experience",
            "education",
            "certifications",
        ]

    def get_resumeUrl(self, obj):
        if obj.resume_asset and obj.resume_asset.file:
            return absolute_url(self.context, obj.resume_asset.file.url)
        return obj.resume_url

    def get_featuredProjects(self, obj):
        projects = [project for project in obj.projects.all() if project.featured]
        return ProjectSerializer(projects, many=True, context=self.context).data
