import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserCard } from "../../components/UserCardComp/UserCard";
import { capitalizeFirstLetter } from "../../lib/util";

import "./Bookmarks.css";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [showAddToCollection, setShowAddToCollection] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookmarks();
    fetchCollections();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      
      // Get bookmarked employee IDs
      const bookmarksResponse = await axios.get("http://localhost:3000/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const bookmarkedIds = (bookmarksResponse.data.bookmarks || []).map(b => b.employee_id);
      
      if (bookmarkedIds.length === 0) {
        setBookmarks([]);
        return;
      }
      
      // Use the exact same API call as search page
      const apiDataEmployee = await axios.get(
        `http://localhost:3000/search/employee`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Use the exact same transformation as search page
      const employeesWithTechStackNames = apiDataEmployee.data.employees
        .filter(emp => bookmarkedIds.includes(emp.id))
        .map((emp) => ({
          employee_id: emp.id,
          name: emp.name + " " + emp.surname,
          surname: emp.surname,
          title: emp.title,
          phone: emp.phone,
          company: emp.company,
          email: emp.email,
          github: emp.github,
          user: emp.user,
          linkedIn: emp.linkedIn,
          portfolio: emp.portfolio,
          testimonials: emp.testimonials || [],
          role: capitalizeFirstLetter(emp.role),
          softSkilled: emp.softSkills,
          years_active: emp.experience ? emp.experience : "0-1 Years",
          experienced: emp.experience,
          department: emp.department,
          bio: emp.bio,
          availability: emp.availability.available,
          location: emp.location.split(",")[0],
          emp_education: emp.education,
          certificates: emp.certificates,
          career: emp.career,
          projects: emp.projects,
          avatar: emp.photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          techStack: emp.techStack,
          skills: emp.techStack.map((link) => link.techStack.name),
        }));
      
      setBookmarks(employeesWithTechStackNames);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setBookmarks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCollections = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get("http://localhost:3000/collections", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Collections response:", response.data);
      setCollections(response.data.collections || response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const createCollection = async () => {
    if (!newCollectionName.trim()) return;

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log("Creating collection with name:", newCollectionName);
      const response = await axios.post(
        "http://localhost:3000/collections",
        {
          name: newCollectionName,
          description: newCollectionDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Collection created response:", response.data);
      setNewCollectionName("");
      setNewCollectionDescription("");
      setShowCreateCollection(false);
      setSuccess("Collection created successfully!");
      fetchCollections();
    } catch (error) {
      console.error("Create collection error:", error);
      setError("Failed to create collection");
    }
  };

  const deleteCollection = async (collectionId) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.delete(`http://localhost:3000/collections/${collectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Collection deleted successfully!");
      setSelectedCollection(null);
      fetchCollections();
    } catch (error) {
      setError("Failed to delete collection");
    }
  };

  const removeBookmark = async (employeeId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.delete(`http://localhost:3000/api/v2/bookmark/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Bookmark removed successfully!");
      fetchBookmarks();
      if (selectedCollection) {
        viewCollection(selectedCollection.id);
      }
    } catch (error) {
      setError("Failed to remove bookmark");
    }
  };

  const addToCollection = async (employeeId, collectionId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      
      // Try with employeeId directly first
      const payload = { employeeId, collectionId };
      console.log("Sending payload:", payload);
      
      const response = await axios.post(
        `http://localhost:3000/collections/add-bookmark`,
        { employeeId, collectionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Add to collection response:", response.data);
      setSuccess("Added to collection successfully!");
      setShowAddToCollection(null);
      fetchCollections();
    } catch (error) {
      console.error("Add to collection error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      setError(`Failed to add to collection: ${error.response?.data?.message || error.message}`);
    }
  };

  const removeFromCollection = async (bookmarkId, collectionId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.delete(
        `http://localhost:3000/collections/remove-bookmark`,
        {
          data: { bookmarkId, collectionId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Removed from collection successfully!");
      viewCollection(collectionId);
      fetchCollections();
    } catch (error) {
      setError("Failed to remove from collection");
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(clearMessages, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const viewCollection = async (collectionId) => {
    try {
      console.log("Fetching collection:", collectionId);
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:3000/collections/${collectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Collection response:", response.data);
      const collection = response.data.collection || response.data;
      
      // Transform collection bookmarks to match SearchContext format exactly
      const transformedBookmarks = collection.bookmarks.map(cb => {
        const emp = cb.bookmark.employee;
        return {
          id: emp.id,
          employee_id: emp.id,
          name: emp.name + " " + (emp.surname || ""),
          surname: emp.surname,
          title: emp.title,
          phone: emp.phone,
          company: emp.company,
          email: emp.email,
          github: emp.github,
          user: emp.user,
          linkedIn: emp.linkedIn,
          portfolio: emp.portfolio,
          testimonials: emp.testimonials || [],
          role: emp.role ? emp.role.includes("_") ? emp.role.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ") : emp.role.charAt(0).toUpperCase() + emp.role.slice(1).toLowerCase() : "Unknown",
          softSkilled: emp.softSkills,
          years_active: emp.experience || "0-1 Years",
          experienced: emp.experience,
          department: emp.department || "Unknown",
          bio: emp.bio,
          availability: emp.availability?.available || false,
          location: emp.location ? emp.location.split(",")[0] : "Unknown",
          emp_education: emp.education,
          certificates: emp.certificates,
          career: emp.career,
          projects: emp.projects ? emp.projects.map(project => ({
            project: {
              ...project,
              screenshot: project.screenshot || null,
              createdAt: project.createdAt || new Date().toISOString()
            }
          })) : [],
          avatar: emp.photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          techStack: emp.techStack || [],
          skills: emp.techStack ? emp.techStack.map(link => link.techStack.name) : [],
          photoUrl: emp.photoUrl
        };
      });
      
      console.log("Transformed bookmarks:", transformedBookmarks);
      setSelectedCollection({
        ...collection,
        bookmarks: transformedBookmarks
      });
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  };

  const displayData = selectedCollection ? selectedCollection.bookmarks : bookmarks;

  if (isLoading) {
    return (
      <div className="bookmarks-loading">
        <div className="form-loader"></div>
        <p>Loading bookmarks...</p>
      </div>
    );
  }

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <h1>
          {selectedCollection ? selectedCollection.name : "My Bookmarks"}
        </h1>
        <div className="header-actions">
          {selectedCollection && (
            <>
              <button
                className="delete-collection-btn"
                onClick={() => deleteCollection(selectedCollection.id)}
              >
                Delete Collection
              </button>
              <button
                className="back-btn"
                onClick={() => setSelectedCollection(null)}
              >
                ← Back to All Bookmarks
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearMessages}>×</button>
        </div>
      )}
      {success && (
        <div className="success-message">
          {success}
          <button onClick={clearMessages}>×</button>
        </div>
      )}

      <div className="bookmarks-controls">
        <div className="collections-section">
          <h3>Collections</h3>
          <div className="collections-list">
            <button
              className={`collection-item ${!selectedCollection ? 'active' : ''}`}
              onClick={() => setSelectedCollection(null)}
            >
              All Bookmarks ({bookmarks.length})
            </button>
            {collections.map((collection) => (
              <button
                key={collection.id}
                className={`collection-item ${selectedCollection?.id === collection.id ? 'active' : ''}`}
                onClick={() => viewCollection(collection.id)}
              >
                {collection.name} ({collection.bookmarks?.length || 0})
              </button>
            ))}
            <button
              className="create-collection-btn"
              onClick={() => setShowCreateCollection(true)}
            >
              + Create Collection
            </button>
          </div>
        </div>
      </div>

      {showCreateCollection && (
        <div className="create-collection-modal">
          <div className="modal-content">
            <h3>Create New Collection</h3>
            <input
              type="text"
              placeholder="Collection name (e.g., ABSA Candidates)"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <textarea
              placeholder="Description (optional)"
              value={newCollectionDescription}
              onChange={(e) => setNewCollectionDescription(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={createCollection}>Create</button>
              <button onClick={() => setShowCreateCollection(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <section className="grid-3-cols gap-24-px min-sm:grid-cols-1 results-responsive">
        {displayData.map((user, i) => {
          return (
            <div key={`${user.employee_id}`} className="bookmark-card-container">
              <UserCard 
                user={user} 
                isBookmarked={true}
                onBookmarkToggle={fetchBookmarks}
              />
              <button 
                className="add-to-collection-btn"
                onClick={() => setShowAddToCollection(user.employee_id)}
              >
                + Add to Collection
              </button>
              {showAddToCollection === user.employee_id && (
                <div className="collection-dropdown">
                  {collections.map(collection => (
                    <button
                      key={collection.id}
                      onClick={() => addToCollection(user.employee_id, collection.id)}
                    >
                      {collection.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Bookmarks;